import { Inject, Injectable } from '@nestjs/common'
import {
  filter,
  firstValueFrom,
  map,
  mergeMap,
  race,
  Subject,
  take,
  takeUntil,
  throwError,
  timer,
} from 'rxjs'
import { v4 } from 'uuid'
import { REQUEST_BUS, RESPONSE_BUS } from '../actuator-query-subjects.di-tokens'
import {
  ActuatorQueryRequest,
  ActuatorQueryResponse,
  ActuatorQueryResponseAnswer,
} from '../actuator-query.types'

type Query = Omit<ActuatorQueryRequest, 'jobId'>

const DEFAULT_TIMEOUT = 5000

@Injectable()
export class ActuatorStateFetcherService {
  constructor(
    @Inject(REQUEST_BUS) private $request: Subject<ActuatorQueryRequest>,
    @Inject(RESPONSE_BUS) private $response: Subject<ActuatorQueryResponse>,
  ) {}

  get $queries() {
    return this.$request.asObservable()
  }

  /**
   * Query the state of an actuator.
   * @throws if there are no responses after `timeout` seconds.
   * @throws if something went wrong during fetching.
   *
   * @param query
   * @param timeout
   * @returns The state of the actuator.
   */
  async queryState<T = unknown>(
    query: Query,
    timeout: number = DEFAULT_TIMEOUT,
  ): Promise<T> {
    const jobId = v4()

    this.$request.next({
      ...query,
      jobId,
    })

    const { $response: answerBus } = this

    /**
     * Cancels if ACK has been received. This is intended as a timeout feature.
     */
    const $timeout = timer(timeout).pipe(
      // cancels if it receives an acknowledgement
      takeUntil(answerBus.pipe(filter((res) => res.jobId === jobId))),
      take(1),
      mergeMap(() => throwError(() => new Error('ack timeout'))),
    )

    /**
     * Emits the answer of the query.
     */
    const $answer = answerBus.pipe(
      filter((res) => res.jobId === jobId && res.type === 'ANSWER'),
      map(({ state }: ActuatorQueryResponseAnswer<T>) => state),
      take(1),
    )

    /**
     * Throws an error if ERROR has been received.
     */
    const $error = answerBus.pipe(
      filter((res) => res.jobId === jobId && res.type === 'ERROR'),
      mergeMap((err) => throwError(() => err)),
    )

    return firstValueFrom(race([$timeout, $answer, $error]))
  }

  publishAck(jobId: string) {
    this.$response.next({
      type: 'ACK',
      jobId,
    })
  }

  publishAnswer<T = unknown>(jobId: string, state: T) {
    this.$response.next({
      jobId,
      type: 'ANSWER',
      state,
    })
  }

  publishError<T extends Error = Error>(jobId: string, error: T) {
    this.$response.next({
      jobId,
      type: 'ERROR',
      error,
    })
  }
}

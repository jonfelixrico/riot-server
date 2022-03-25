import { Inject, Injectable } from '@nestjs/common'
import {
  filter,
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
  StateQueryRequest,
  StateQueryResponse,
  StateQueryResponseAnswer,
  StateQueryResponseError,
} from '../actuator-query.types'

type Query = Omit<StateQueryRequest, 'jobId'>

const DEFAULT_TIMEOUT = 5000

export class ActuatorStateFetcherTimeoutError extends Error {}

@Injectable()
export class ActuatorStateFetcherService {
  constructor(
    @Inject(REQUEST_BUS) private $request: Subject<StateQueryRequest>,
    @Inject(RESPONSE_BUS) private $response: Subject<StateQueryResponse>,
  ) {}

  /**
   * Query the state of an actuator.
   * @throws if there are no responses after `timeout` seconds.
   * @throws if something went wrong during fetching.
   *
   * @param query
   * @param timeout
   * @param jobId This is only for testing purposes. Do not use this in production.
   * @returns The state of the actuator.
   */
  async queryState<T = unknown>(
    query: Query,
    timeout: number = DEFAULT_TIMEOUT,
    jobId?: string,
  ): Promise<T> {
    jobId = jobId ?? v4()

    this.$request.next({
      ...query,
      jobId,
    })

    const { $response: answerBus } = this

    /**
     * Cancels if ACK has been received. This is intended as a timeout feature.
     */
    const $timeout = timer(timeout).pipe(
      take(1),
      // cancels if it receives an acknowledgement
      takeUntil(answerBus.pipe(filter((res) => res.jobId === jobId))),
      mergeMap(() => throwError(() => new ActuatorStateFetcherTimeoutError())),
    )

    /**
     * Emits the answer of the query.
     */
    const $answer = answerBus.pipe(
      filter((res) => res.jobId === jobId && res.type === 'ANSWER'),
      take(1),
      map(({ state }: StateQueryResponseAnswer<T>) => state),
    )

    /**
     * Throws an error if ERROR has been received.
     */
    const $error = answerBus.pipe(
      filter((res) => res.jobId === jobId && res.type === 'ERROR'),
      take(1),
      mergeMap(({ error }: StateQueryResponseError) => throwError(() => error)),
    )

    return new Promise((resolve, reject) => {
      race($timeout, $answer, $error).subscribe({
        error: reject,
        next: resolve,
      })
    })
  }
}

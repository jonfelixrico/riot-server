import { Injectable } from '@nestjs/common'
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

interface QueryRequest {
  deviceId: string
  actuatorId: string
  type: string
  jobId: string
}

interface AckResponse {
  jobId: string
  type: 'ACK'
}

interface AnswerResponse<T = unknown> {
  jobId: string
  state: T
  type: 'ANSWER'
}

interface ErrorResponse {
  jobId: string
  type: 'ERROR'
  error: Error
}

type QueryResponse = AckResponse | AnswerResponse | ErrorResponse

export type ActuatorStateQuery = Omit<QueryRequest, 'jobId'>

const DEFAULT_TIMEOUT = 5000

@Injectable()
export class ActuatorStateFetcherService {
  private queryBus = new Subject<QueryRequest>()
  private answerBus = new Subject<QueryResponse>()

  get $queries() {
    return this.queryBus.asObservable()
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
    query: ActuatorStateQuery,
    timeout: number = DEFAULT_TIMEOUT,
  ): Promise<T> {
    const jobId = v4()

    this.queryBus.next({
      ...query,
      jobId,
    })

    const { answerBus } = this

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
      map(({ state }: AnswerResponse<T>) => state),
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
    this.answerBus.next({
      type: 'ACK',
      jobId,
    })
  }

  publishAnswer<T = unknown>(jobId: string, state: T) {
    this.answerBus.next({
      jobId,
      type: 'ANSWER',
      state,
    })
  }

  publishError<T extends Error = Error>(jobId: string, error: T) {
    this.answerBus.next({
      jobId,
      type: 'ERROR',
      error,
    })
  }
}

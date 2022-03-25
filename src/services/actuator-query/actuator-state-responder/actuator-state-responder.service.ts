import { Inject, Injectable } from '@nestjs/common'
import { omit } from 'lodash'
import { filter, map, Observable, Subject } from 'rxjs'
import { REQUEST_BUS, RESPONSE_BUS } from '../actuator-query-subjects.di-tokens'
import { StateQueryRequest, StateQueryResponse } from '../actuator-query.types'

type Query = Omit<StateQueryRequest, 'type'>

@Injectable()
export class ActuatorStateResponderService {
  constructor(
    @Inject(REQUEST_BUS) private $request: Subject<StateQueryRequest>,
    @Inject(RESPONSE_BUS) private $response: Subject<StateQueryResponse>,
  ) {}

  /**
   * Observable that contains all queries.
   */
  get $queries() {
    return this.$request.asObservable()
  }

  /**
   * Sets up a listener for a particular actuator type.
   * @param type The actuator type to listen to.
   * @returns
   */
  getQueriesForType(type: string): Observable<Query> {
    return this.$request.pipe(
      filter((query) => query.type === type),
      map((query) => omit(query, 'type')),
    )
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

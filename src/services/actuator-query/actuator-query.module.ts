import { Module } from '@nestjs/common'
import { REQUEST_BUS, RESPONSE_BUS } from './actuator-query-subjects.di-tokens'
import { ActuatorStateFetcherService } from './actuator-state-fetcher/actuator-state-fetcher.service'
import { ActuatorStateResponderService } from './actuator-state-responder/actuator-state-responder.service'
import { StateQueryRequest, StateQueryResponse } from './actuator-query.types'
import { Subject } from 'rxjs'

@Module({
  providers: [
    ActuatorStateFetcherService,
    ActuatorStateResponderService,
    {
      provide: REQUEST_BUS,
      useFactory: () => new Subject<StateQueryRequest>(),
    },
    {
      provide: RESPONSE_BUS,
      useFactory: () => new Subject<StateQueryResponse>(),
    },
  ],

  exports: [ActuatorStateFetcherService, ActuatorStateResponderService],
})
export class ActuatorQueryModule {}

import { Module } from '@nestjs/common'
import { ActuatorStateFetcherService } from './actuator-state-fetcher/actuator-state-fetcher.service'
import { ActuatorStateResponderService } from './actuator-state-responder/actuator-state-responder.service'

@Module({
  providers: [ActuatorStateFetcherService, ActuatorStateResponderService],
  exports: [ActuatorStateFetcherService],
})
export class ActuatorQueryModule {}

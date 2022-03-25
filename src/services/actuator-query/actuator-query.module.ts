import { Module } from '@nestjs/common'
import { ActuatorStateFetcherService } from './actuator-state-fetcher/actuator-state-fetcher.service'

@Module({
  providers: [ActuatorStateFetcherService],
  exports: [ActuatorStateFetcherService],
})
export class ActuatorQueryModule {}

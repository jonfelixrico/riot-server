import { Module } from '@nestjs/common'
import { ActuatorQueryModule } from '../actuator-query/actuator-query.module'
import { SwitchImplService } from './switch/switch-impl/switch-impl.service'
import { SwitchModuleService } from './switch/switch-module-service.abstract'

@Module({
  imports: [ActuatorQueryModule],

  providers: [
    SwitchImplService,
    {
      useExisting: SwitchImplService,
      provide: SwitchModuleService,
    },
  ],

  exports: [SwitchModuleService],
})
export class SpecializedDevicesModule {}

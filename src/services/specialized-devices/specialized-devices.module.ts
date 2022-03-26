import { Module } from '@nestjs/common'
import { MongooseModule } from 'src/mongoose/mongoose.module'
import { ActuatorQueryModule } from '../actuator-query/actuator-query.module'
import { SwitchImplService } from './switch/switch-impl/switch-impl.service'
import { SwitchModuleService } from './switch/switch-module-service.abstract'

@Module({
  imports: [ActuatorQueryModule, MongooseModule],

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

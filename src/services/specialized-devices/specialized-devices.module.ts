import { Module } from '@nestjs/common'
import { CommonServicesModule } from 'src/common-services/common-services.module'
import { MongooseModule } from 'src/mongoose/mongoose.module'
import { SwitchImplService } from './switch/switch-impl/switch-impl.service'
import { SWITCH_MANAGER } from './switch/switch-manager.interface'

@Module({
  imports: [MongooseModule, CommonServicesModule],

  providers: [
    SwitchImplService,
    {
      useExisting: SwitchImplService,
      provide: SWITCH_MANAGER,
    },
  ],

  exports: [SwitchModuleService, SWITCH_MANAGER],
})
export class SpecializedDevicesModule {}

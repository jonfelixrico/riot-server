import { Module } from '@nestjs/common'
import { CommonServicesModule } from '@app/common-services/common-services.module'
import { MongooseModule } from '@app/mongoose/mongoose.module'
import { SwitchImplService } from './impl/switch-impl/switch-impl.service'
import { SWITCH_MANAGER } from './switch-manager.interface'

@Module({
  imports: [MongooseModule, CommonServicesModule],

  providers: [
    SwitchImplService,
    {
      useExisting: SwitchImplService,
      provide: SWITCH_MANAGER,
    },
  ],

  exports: [SWITCH_MANAGER],
})
export class SpecializedDevicesModule {}

import { Module } from '@nestjs/common'
import { CommonServicesModule } from 'src/common-services/common-services.module'
import { MongooseModule } from 'src/mongoose/mongoose.module'
import { SwitchImplService } from './switch/switch-impl/switch-impl.service'
import { SwitchModuleService } from './switch/switch-module-service.abstract'

@Module({
  imports: [MongooseModule, CommonServicesModule],

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

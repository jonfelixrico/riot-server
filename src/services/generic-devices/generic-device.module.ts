import { Module } from '@nestjs/common'
import { DeviceImplService } from './device-impl/device-impl.service'
import { DeviceService } from './device-service.abstract'
import { MongooseModule } from 'src/mongoose/mongoose.module'
import { DeviceRegistrationQueueImplService } from './device-registration-queue-impl/device-registration-queue-impl.service'
import { DeviceRegistrationQueueService } from './device-registration-queue-service.abstract'
import { SpecializedDevicesModule } from '../specialized-devices/specialized-devices.module'
import { ModuleStateImplService } from './module-state-impl/module-state-impl.service'
import { ModuleStateService } from './module-state-service.abstract'

@Module({
  imports: [MongooseModule, SpecializedDevicesModule],

  providers: [
    DeviceImplService,
    {
      provide: DeviceService,
      useExisting: DeviceImplService,
    },

    DeviceRegistrationQueueImplService,
    {
      provide: DeviceRegistrationQueueService,
      useExisting: DeviceRegistrationQueueImplService,
    },

    ModuleStateImplService,
    {
      provide: ModuleStateService,
      useExisting: ModuleStateImplService,
    },
  ],

  exports: [DeviceService, DeviceRegistrationQueueService, ModuleStateService],
})
export class GenericDevicesModule {}

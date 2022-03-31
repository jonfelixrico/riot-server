import { Module } from '@nestjs/common'
import { DeviceImplService } from './impl/device-impl/device-impl.service'
import { DEVICE_MANAGER } from './device-manager.interface'
import { MongooseModule } from '@app/mongoose/mongoose.module'
import { DeviceRegistrationQueueImplService } from './impl/device-registration-queue-impl/device-registration-queue-impl.service'
import { DEVICE_REGISTRATION_QUEUE } from './device-registration-queue.interface'
import { SpecializedDevicesModule } from '../specialized-devices/specialized-devices.module'
import { ModuleStateImplService } from './impl/module-state-impl/module-state-impl.service'
import { MODULE_STATE_PROVIDER } from './module-state-provider.interface'

@Module({
  imports: [MongooseModule, SpecializedDevicesModule],

  providers: [
    DeviceImplService,
    {
      provide: DEVICE_MANAGER,
      useExisting: DeviceImplService,
    },

    DeviceRegistrationQueueImplService,
    {
      provide: DEVICE_REGISTRATION_QUEUE,
      useExisting: DeviceRegistrationQueueImplService,
    },

    ModuleStateImplService,
    {
      provide: MODULE_STATE_PROVIDER,
      useExisting: ModuleStateImplService,
    },
  ],

  exports: [DEVICE_MANAGER, DEVICE_REGISTRATION_QUEUE, MODULE_STATE_PROVIDER],
})
export class GenericDevicesModule {}

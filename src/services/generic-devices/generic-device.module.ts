import { Module } from '@nestjs/common'
import { DeviceImplService } from './device-impl/device-impl.service'
import { DeviceService } from './device-service.abstract'
import { ActuatorImplService } from './actuator-impl/actuator-impl.service'
import { ActuatorService } from './actuator-service.abstract'
import { SensorImplService } from './sensor-impl/sensor-impl.service'
import { SensorService } from './sensor-service.abstract'
import { MongooseModule } from 'src/mongoose/mongoose.module'
import { DeviceRegistrationQueueImplService } from './device-registration-queue-impl/device-registration-queue-impl.service'
import { DeviceRegistrationQueueService } from './device-registration-queue-service.abstract'
import { SpecializedDevicesModule } from '../specialized-devices/specialized-devices.module'

@Module({
  imports: [MongooseModule, SpecializedDevicesModule],

  providers: [
    DeviceImplService,
    {
      provide: DeviceService,
      useExisting: DeviceImplService,
    },

    ActuatorImplService,
    {
      provide: ActuatorService,
      useExisting: ActuatorImplService,
    },

    SensorImplService,
    {
      provide: SensorService,
      useExisting: SensorImplService,
    },

    DeviceRegistrationQueueImplService,
    {
      provide: DeviceRegistrationQueueService,
      useExisting: DeviceRegistrationQueueImplService,
    },
  ],

  exports: [
    DeviceService,
    SensorService,
    ActuatorService,
    DeviceRegistrationQueueService,
  ],
})
export class GenericDevicesModule {}

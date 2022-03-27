import { Module } from '@nestjs/common'
import { DeviceImplService } from './device-impl/device-impl.service'
import { DeviceService } from './device-service.abstract'
import { ActuatorImplService } from './actuator-impl/actuator-impl.service'
import { ActuatorService } from './actuator-service.abstract'
import { SensorImplService } from './sensor-impl/sensor-impl.service'
import { SensorService } from './sensor-service.abstract'

@Module({
  imports: [],
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
  ],
})
export class GenericDevicesModule {}

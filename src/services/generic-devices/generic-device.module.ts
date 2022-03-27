import { Module } from '@nestjs/common'
import { DeviceImplService } from './device-impl/device-impl.service'
import { DeviceService } from './device-service.abstract'
import { ActuatorImplService } from './actuator-impl/actuator-impl.service'
import { ActuatorService } from './actuator-service.abstract'

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
  ],
})
export class GenericDevicesModule {}

import { Module } from '@nestjs/common'
import { ArduinoController } from './controllers/arduino/arduino.controller'
import { UnknownDevicesController } from './controllers/api/unknown-devices/unknown-devices.controller'
import { DevicesController } from './controllers/api/devices/devices.controller'
import { SwitchController } from './controllers/api/device-modules/switch/switch.controller'
import { UnifiedActuatorStateFetcherService } from './services/unified-actuator-state-fetcher/unified-actuator-state-fetcher.service'

@Module({
  imports: [],
  controllers: [
    ArduinoController,
    UnknownDevicesController,
    DevicesController,
    SwitchController,
  ],
  providers: [UnifiedActuatorStateFetcherService],
})
export class AppModule {}

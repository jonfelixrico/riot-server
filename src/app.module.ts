import { Module } from '@nestjs/common'
import { ArduinoController } from './controllers/arduino/arduino.controller'
import { DevicesController } from './controllers/api/devices/devices.controller'
import { SwitchController } from './controllers/api/device-modules/switch/switch.controller'
import { ActuatorQueryModule } from './services/actuator-query/actuator-query.module'
import { MongooseModule } from './mongoose/mongoose.module'
import { ControllersModule } from './controllers/controllers.module'
import { UnknownDevicesController } from './controllers/api/unknown-devices/unknown-devices.controller'

@Module({
  imports: [ActuatorQueryModule, MongooseModule, ControllersModule],
  controllers: [
    ArduinoController,
    DevicesController,
    SwitchController,
    // UnknownDevicesController
  ],
})
export class AppModule {}

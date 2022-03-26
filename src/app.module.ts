import { Module } from '@nestjs/common'
import { ArduinoController } from './controllers/arduino/arduino.controller'
import { ActuatorQueryModule } from './services/actuator-query/actuator-query.module'
import { MongooseModule } from './mongoose/mongoose.module'
import { UnknownDevicesController } from './controllers/api/unknown-devices/unknown-devices.controller'
import { DeviceControllersModule } from './controllers/device-controllers/device-controllers.module'

@Module({
  imports: [ActuatorQueryModule, MongooseModule, DeviceControllersModule],
  controllers: [
    ArduinoController,
    // UnknownDevicesController
  ],
})
export class AppModule {}

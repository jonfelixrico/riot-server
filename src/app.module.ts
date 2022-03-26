import { Module } from '@nestjs/common'
import { ArduinoController } from './controllers/arduino/arduino.controller'
import { ActuatorQueryModule } from './services/actuator-query/actuator-query.module'
import { MongooseModule } from './mongoose/mongoose.module'
import { DeviceAdminControllersModule } from './controllers/device-admin-controllers/device-admin-controllers.module'

@Module({
  imports: [ActuatorQueryModule, MongooseModule, DeviceAdminControllersModule],
  controllers: [ArduinoController],
})
export class AppModule {}

import { Module } from '@nestjs/common'
import { ActuatorQueryModule } from './services/actuator-query/actuator-query.module'
import { MongooseModule } from './mongoose/mongoose.module'
import { DeviceAdminControllersModule } from './controllers/device-admin-controllers/device-admin-controllers.module'
import { ArduinoControllersModule } from './controllers/arduino-controllers/arduino-controllers.module'
import { GenericDeviceModule } from './services/generic-device/generic-device.module'

@Module({
  imports: [
    ActuatorQueryModule,
    MongooseModule,
    DeviceAdminControllersModule,
    ArduinoControllersModule,
    GenericDeviceModule,
  ],
})
export class AppModule {}

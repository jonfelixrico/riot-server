import { Module } from '@nestjs/common'
import { MongooseModule } from './mongoose/mongoose.module'
import { DeviceAdminControllersModule } from './controllers/device-admin-controllers/device-admin-controllers.module'
import { ArduinoControllersModule } from './controllers/arduino-controllers/arduino-controllers.module'
import { GenericDevicesModule } from './services/generic-devices/generic-device.module'
import { SpecializedDevicesModule } from './services/specialized-devices/specialized-devices.module'
import { CommonServicesModule } from './common-services/common-services.module'

@Module({
  imports: [
    MongooseModule,
    DeviceAdminControllersModule,
    ArduinoControllersModule,
    GenericDevicesModule,
    SpecializedDevicesModule,
    CommonServicesModule,
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common'
import { DevicesController } from './controllers/devices/devices.controller'
import { GenericDevicesModule } from 'src/services/generic-devices/generic-device.module'
import { SwitchController } from './controllers/switch/switch.controller'
import { DeviceRegistrationController } from './controllers/device-registration/device-registration.controller'

/**
 * This modules holds the controllers responsible for managing/configuring devices.
 */
@Module({
  controllers: [
    DevicesController,
    SwitchController,
    DeviceRegistrationController,
    // TODO uncomment when ready
    // UnknownDevicesController,
  ],

  imports: [GenericDevicesModule],
})
export class DeviceAdminControllersModule {}

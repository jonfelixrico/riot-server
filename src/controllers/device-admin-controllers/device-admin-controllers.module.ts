import { Module } from '@nestjs/common'
import { SwitchController } from './switch/switch.controller'
import { DevicesController } from './devices/devices.controller'
import { UnknownDevicesController } from './unknown-devices/unknown-devices.controller'
import { GenericDevicesModule } from 'src/services/generic-devices/generic-device.module'

/**
 * This modules holds the controllers responsible for managing/configuring devices.
 */
@Module({
  controllers: [
    DevicesController,
    SwitchController,
    // TODO uncomment when ready
    // UnknownDevicesController,
  ],

  imports: [GenericDevicesModule],
})
export class DeviceAdminControllersModule {}

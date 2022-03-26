import { Module } from '@nestjs/common'
import { SwitchController } from './switch/switch.controller'
import { DevicesController } from './devices/devices.controller'
import { UnknownDevicesController } from './unknown-devices/unknown-devices.controller'

@Module({
  controllers: [
    DevicesController,
    SwitchController,
    //
    UnknownDevicesController,
  ],
})
export class DeviceControllersModule {}

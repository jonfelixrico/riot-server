import { Module } from '@nestjs/common'
import { SwitchController } from './switch/switch.controller'
import { DevicesController } from './devices/devices.controller'

@Module({
  controllers: [DevicesController, SwitchController],
})
export class DeviceControllersModule {}

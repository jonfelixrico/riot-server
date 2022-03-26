import { Module } from '@nestjs/common'
import { GenericDevicesModule } from 'src/services/generic-devices/generic-device.module'
import { ArduinoController } from './arduino/arduino.controller'

/**
 * This module holds controllers which the arduino devices are supposed to contact.
 */
@Module({
  controllers: [ArduinoController],
  imports: [GenericDevicesModule],
})
export class ArduinoControllersModule {}

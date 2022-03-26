import { Module } from '@nestjs/common'
import { GenericDeviceModule } from 'src/services/generic-device/generic-device.module'
import { ArduinoController } from './arduino/arduino.controller'

/**
 * This module holds controllers which the arduino devices are supposed to contact.
 */
@Module({
  controllers: [ArduinoController],
  imports: [GenericDeviceModule],
})
export class ArduinoControllersModule {}

import { Module } from '@nestjs/common'
import { ArduinoController } from './arduino/arduino.controller'

/**
 * This module holds controllers which the arduino devices are supposed to contact.
 */
@Module({
  controllers: [ArduinoController],
})
export class ArduinoControllersModule {}

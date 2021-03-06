import { Module } from '@nestjs/common'
import { GenericDevicesModule } from '@app/services/generic-devices/generic-device.module'
import { ArduinoController } from './controllers/arduino/arduino.controller'

/**
 * This module holds controllers which the arduino devices are supposed to contact.
 */
@Module({
  controllers: [ArduinoController],
  imports: [GenericDevicesModule],
})
export class ArduinoControllersModule {}

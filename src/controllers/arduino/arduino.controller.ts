import { Body, Controller, Get, Param, Put } from '@nestjs/common'
import { PushSensorReadingsDto } from './push-sensor-readings.dto'
import { RegisterDeviceDto } from './register-device.dto'

@Controller('arduino')
export class ArduinoController {
  @Get('/:id')
  getActuatorState(@Param('id') id: string) {
    throw new Error('noop')
  }

  @Put('/:id')
  pushSensorReadings(
    @Body() readings: PushSensorReadingsDto,
    @Param('id') id: string,
  ) {
    throw new Error('noop')
  }

  @Put('/:id/setup')
  registerDevice(
    @Body() deviceInfo: RegisterDeviceDto,
    @Param('id') id: string,
  ) {
    throw new Error('noop')
  }
}

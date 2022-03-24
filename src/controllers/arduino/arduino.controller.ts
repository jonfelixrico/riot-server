import { Body, Controller, Get, Param, Put } from '@nestjs/common'
import { RegisterDeviceDto } from './register-device.dto'

@Controller('arduino')
export class ArduinoController {
  @Get()
  getActuatorState() {
    throw new Error('noop')
  }

  @Put()
  pushSensorReadings() {
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

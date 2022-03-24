import { Controller, Get, Put } from '@nestjs/common'

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

  @Put('/setup')
  registerDevice() {
    throw new Error('noop')
  }
}

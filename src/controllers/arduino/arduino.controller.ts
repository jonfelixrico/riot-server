import { Body, Controller, Get, Param, Put } from '@nestjs/common'
import { ActuatorService } from 'src/services/actuator-service.abstract'
import { DeviceService } from 'src/services/device-service.abstract'
import { SensorService } from 'src/services/sensor-service.abstract'
import { PushSensorReadingsDto } from './push-sensor-readings.dto'
import { RegisterDeviceDto } from './register-device.dto'

@Controller('arduino')
export class ArduinoController {
  constructor(
    private actuatorSvc: ActuatorService,
    private sensorService: SensorService,
    private deviceService: DeviceService,
  ) {}

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

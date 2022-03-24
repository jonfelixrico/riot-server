import { Body, Controller, Get, Param, Put } from '@nestjs/common'
import { v4 as uuidv4 } from 'uuid'
import { ActuatorService } from 'src/services/actuator-service.abstract'
import { DeviceService } from 'src/services/device-service.abstract'
import { SensorService } from 'src/services/sensor-service.abstract'
import { PushSensorReadingsDto } from './push-sensor-readings.dto'
import { RegisterDeviceDto } from './register-device.dto'

@Controller('arduino')
export class ArduinoController {
  constructor(
    private actuatorSvc: ActuatorService,
    private sensorSvc: SensorService,
    private deviceSvc: DeviceService,
  ) {}

  @Get('/:id')
  async getActuatorState(@Param('id') id: string) {
    return await this.actuatorSvc.getStates(id)
  }

  @Put('/:id')
  async pushSensorReadings(
    @Body() body: PushSensorReadingsDto,
    @Param('id') id: string,
  ) {
    await this.sensorSvc.pushReadings(id, body.modules)
  }

  @Put('/:id/setup')
  async registerDevice(
    @Body() deviceInfo: RegisterDeviceDto,
    @Param('id') id: string,
  ) {
    await this.deviceSvc.setupDevice(
      {
        ...deviceInfo,
        id: id,
      },
      uuidv4(),
    )
  }
}

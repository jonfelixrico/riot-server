import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  UnauthorizedException,
  Headers,
} from '@nestjs/common'
import { v4 as uuidv4 } from 'uuid'
import { ActuatorService } from 'src/services/actuator-service.abstract'
import { DeviceService } from 'src/services/device-service.abstract'
import { SensorService } from 'src/services/sensor-service.abstract'
import { SensorReadingDto } from './sensor-reading.dto'
import { RegisterDeviceDto } from './register-device.dto'

const REGISTRATION_TOKEN_HEADER = 'registration-token'

@Controller('arduino')
export class ArduinoController {
  constructor(
    private actuatorSvc: ActuatorService,
    private sensorSvc: SensorService,
    private deviceSvc: DeviceService,
  ) {}

  @Get('/:deviceId')
  async getActuatorState(
    @Param('deviceId') deviceId: string,
    @Headers(REGISTRATION_TOKEN_HEADER) registrationToken: string,
  ) {
    const isRegistered = await this.deviceSvc.isDeviceRegistered(
      deviceId,
      registrationToken,
    )
    if (isRegistered) {
      throw new UnauthorizedException('Device needs to register first.')
    }

    await this.deviceSvc.bumpHeartbeat(deviceId)
    return await this.actuatorSvc.getStates(deviceId)
  }

  @Put('/:deviceId')
  async pushSensorReadings(
    @Body() readings: SensorReadingDto[],
    @Param('deviceId') deviceId: string,
    @Headers(REGISTRATION_TOKEN_HEADER) registrationToken: string,
  ) {
    const isRegistered = await this.deviceSvc.isDeviceRegistered(
      deviceId,
      registrationToken,
    )
    if (isRegistered) {
      throw new UnauthorizedException('Device needs to register first.')
    }

    await Promise.all([
      this.deviceSvc.bumpHeartbeat(deviceId),
      this.sensorSvc.pushReadings(deviceId, readings),
    ])
  }

  @Put('/:deviceId/register')
  async registerDevice(
    @Body() deviceInfo: RegisterDeviceDto,
    @Param('deviceId') deviceId: string,
  ) {
    await Promise.all([
      this.deviceSvc.registerDevice(
        {
          ...deviceInfo,
          id: deviceId,
        },
        uuidv4(),
      ),
      this.deviceSvc.bumpHeartbeat(deviceId),
    ])
  }
}

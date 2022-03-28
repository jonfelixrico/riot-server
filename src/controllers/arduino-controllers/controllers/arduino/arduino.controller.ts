import {
  Body,
  Controller,
  ForbiddenException,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common'
import { DeviceService } from 'src/services/generic-devices/device-service.abstract'
import { DeviceRegistrationQueueService } from 'src/services/generic-devices/device-registration-queue-service.abstract'
import { ModuleToRegisterDto } from '../../dto/module-to-register.dto'

@Controller('arduino/:deviceId/version/:version')
export class ArduinoController {
  constructor(
    private deviceSvc: DeviceService,
    private regSvc: DeviceRegistrationQueueService,
  ) {}

  @Post()
  @HttpCode(202)
  async registerDevice(
    @Param('deviceId') deviceId,
    @Param('version') firmwareVersion,
    @Body() toRegister: ModuleToRegisterDto[],
  ) {
    if (
      await this.deviceSvc.isDeviceRegistered({ deviceId, firmwareVersion })
    ) {
      throw new ForbiddenException('Device has already been registered.')
    }

    await this.regSvc.flagForQueue({
      deviceId,
      firmwareVersion,
      modules: toRegister,
    })
  }

  @Put()
  async processEmit(
    @Param('deviceId') deviceId,
    @Param('version') firmwareVersion,
  ) {
    if (
      !(await this.deviceSvc.isDeviceRegistered({ deviceId, firmwareVersion }))
    ) {
      throw new NotFoundException('Device is not registered in the system.')
    }

    // TODO return state
  }
}

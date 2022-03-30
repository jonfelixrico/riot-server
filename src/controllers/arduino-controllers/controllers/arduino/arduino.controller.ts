import {
  Body,
  Controller,
  ForbiddenException,
  HttpCode,
  Inject,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common'
import { DeviceRegistrationQueueService } from 'src/services/generic-devices/device-registration-queue-service.abstract'
import { ModuleToRegisterDto } from '../../dto/module-to-register.dto'
import { ModuleStateService } from 'src/services/generic-devices/module-state-service.abstract'
import {
  DeviceManager,
  DEVICE_MANAGER,
} from 'src/services/generic-devices/device-manager.interface'

@Controller('arduino/:deviceId/version/:version')
export class ArduinoController {
  constructor(
    @Inject(DEVICE_MANAGER) private deviceSvc: DeviceManager,
    private regSvc: DeviceRegistrationQueueService,
    private mStateSvc: ModuleStateService,
  ) {}

  @Post()
  @HttpCode(202)
  async queueForRegistration(
    @Param('deviceId') deviceId: string,
    @Param('version') firmwareVersion: string,
    @Body() toRegister: ModuleToRegisterDto[],
  ) {
    if (await this.deviceSvc.doesDeviceExist({ deviceId, firmwareVersion })) {
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
    @Param('deviceId') deviceId: string,
    @Param('version') firmwareVersion: string,
  ) {
    const query = {
      deviceId,
      firmwareVersion,
    }

    if (!(await this.deviceSvc.doesDeviceExist(query))) {
      throw new NotFoundException('Device is not registered in the system.')
    }

    // not very relevant to the process; we can afford having it fail unexpectedly
    void this.deviceSvc.bumpHeartbeat(query).catch((e) => {
      console.error(e)
    })

    return await this.mStateSvc.getStates(query)
  }
}

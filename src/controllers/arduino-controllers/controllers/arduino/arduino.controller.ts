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
import { ModuleToRegisterDto } from '../../dto/module-to-register.dto'
import { ModuleStateService } from '@app/services/generic-devices/module-state-provider.interface'
import {
  DeviceManager,
  DEVICE_MANAGER,
} from '@app/services/generic-devices/device-manager.interface'
import {
  DeviceRegistrationQueue,
  DEVICE_REGISTRATION_QUEUE,
} from '@app/services/generic-devices/device-registration-queue.interface'

@Controller('arduino/:deviceId/version/:version')
export class ArduinoController {
  constructor(
    @Inject(DEVICE_MANAGER) private deviceSvc: DeviceManager,
    @Inject(DEVICE_REGISTRATION_QUEUE) private regSvc: DeviceRegistrationQueue,
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

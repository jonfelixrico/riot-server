import {
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  NotFoundException,
  Param,
} from '@nestjs/common'
import { DeviceRegistrationQueueService } from 'src/services/generic-devices/device-registration-queue-service.abstract'
import { DeviceService } from 'src/services/generic-devices/device-service.abstract'

@Controller('api/devices/unregistered')
export class DeviceRegistrationController {
  constructor(
    private regSvc: DeviceRegistrationQueueService,
    private deviceSvc: DeviceService,
  ) {}

  @Get()
  async getDevicesForRegistration() {
    return await this.regSvc.getQueueItems()
  }

  @Get(':deviceId/versions/:version')
  async getDeviceForRegistration(
    @Param('deviceId') deviceId: string,
    @Param('version') firmwareVersion: string,
  ) {
    return await this.regSvc.getQueueItem({
      deviceId,
      firmwareVersion,
    })
  }

  @HttpCode(201)
  @Get(':deviceId/versions/:version')
  async registerDevice(
    @Param('deviceId') deviceId: string,
    @Param('version') firmwareVersion: string,
  ) {
    const query = {
      deviceId,
      firmwareVersion,
    }

    const queueItem = await this.regSvc.getQueueItem(query)

    if (!queueItem) {
      throw new NotFoundException('Device is not in the registration queue.')
    }

    if (!(await this.deviceSvc.getDevice(query))) {
      throw new ForbiddenException('Device already registered.')
    }

    await this.deviceSvc.registerDevice(queueItem)
  }

  @Delete(':deviceId/versions/:version')
  async deleteRegistrationAttempt(
    @Param('deviceId') deviceId: string,
    @Param('version') firmwareVersion: string,
  ) {
    await this.regSvc.removeFromQueue({
      deviceId,
      firmwareVersion,
    })
  }
}

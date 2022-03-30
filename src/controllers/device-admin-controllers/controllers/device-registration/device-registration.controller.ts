import {
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  Inject,
  NotFoundException,
  Param,
} from '@nestjs/common'
import {
  DeviceManager,
  DEVICE_MANAGER,
} from 'src/services/generic-devices/device-manager.interface'
import {
  DeviceRegistrationQueue,
  DEVICE_REGISTRATION_QUEUE,
} from 'src/services/generic-devices/device-registration-queue.interface'

@Controller('api/devices/unregistered')
export class DeviceRegistrationController {
  constructor(
    @Inject(DEVICE_REGISTRATION_QUEUE) private regSvc: DeviceRegistrationQueue,
    @Inject(DEVICE_MANAGER) private deviceSvc: DeviceManager,
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

    if (!(await this.deviceSvc.doesDeviceExist(query))) {
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

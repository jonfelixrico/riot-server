import {
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  Inject,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common'
import {
  DeviceManager,
  DEVICE_MANAGER,
} from '@app/services/generic-devices/device-manager.interface'
import {
  DeviceRegistrationQueue,
  DEVICE_REGISTRATION_QUEUE,
  QueuedDevice,
} from '@app/services/generic-devices/device-registration-queue.interface'
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger'
import { QueuedDeviceDto } from './queued-device.dto'

@ApiTags('device-registration')
@Controller('api/device/unregistered')
export class DeviceRegistrationController {
  constructor(
    @Inject(DEVICE_REGISTRATION_QUEUE) private regSvc: DeviceRegistrationQueue,
    @Inject(DEVICE_MANAGER) private deviceSvc: DeviceManager,
  ) {}

  @Get()
  @ApiOkResponse({
    type: [QueuedDeviceDto],
  })
  async getDevicesForRegistration(): Promise<QueuedDevice[]> {
    return await this.regSvc.getQueueItems()
  }

  @ApiOkResponse({
    type: QueuedDeviceDto,
  })
  @ApiNotFoundResponse()
  @Get(':deviceId/version/:version')
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
  @ApiCreatedResponse({
    description: 'The device was registered.',
  })
  @ApiNotFoundResponse({
    description: 'The device is not queued up for registration.',
  })
  @ApiForbiddenResponse({
    description: 'Device has already been registered.',
  })
  @Post(':deviceId/version/:version')
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

    if (await this.deviceSvc.doesDeviceExist(query)) {
      throw new ForbiddenException('Device already registered.')
    }

    await this.deviceSvc.registerDevice(queueItem)
  }

  @Delete(':deviceId/version/:version')
  @ApiOkResponse({
    description: 'Device registration has been removed.',
  })
  @ApiNotFoundResponse({
    description: 'The device is not queued up for registration.',
  })
  async deleteRegistrationAttempt(
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

    await this.regSvc.removeFromQueue(query)
  }
}

import {
  Controller,
  Get,
  Inject,
  NotFoundException,
  Param,
} from '@nestjs/common'
import {
  DeviceManager,
  DEVICE_MANAGER,
} from '@app/services/generic-devices/device-manager.interface'
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { DeviceDto } from './device.dto'

@ApiTags('device')
@Controller('api/device')
export class DevicesController {
  constructor(@Inject(DEVICE_MANAGER) private deviceSvc: DeviceManager) {}

  @Get()
  @ApiOkResponse({
    type: [DeviceDto],
  })
  async listDevices() {
    return await this.deviceSvc.getDevices()
  }

  @Get(':deviceId/version/:version')
  @ApiOkResponse({
    type: DeviceDto,
  })
  @ApiNotFoundResponse()
  async getDeviceInfo(
    @Param('deviceId') deviceId: string,
    @Param('version') firmwareVersion: string,
  ) {
    const deviceData = await this.deviceSvc.getDevice({
      deviceId,
      firmwareVersion,
    })

    if (!deviceData) {
      throw new NotFoundException('Device not found.')
    }

    return deviceData
  }
}

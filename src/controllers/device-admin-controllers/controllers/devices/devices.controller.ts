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

@Controller('api/devices')
export class DevicesController {
  constructor(@Inject(DEVICE_MANAGER) private deviceSvc: DeviceManager) {}

  @Get()
  async listDevices() {
    return await this.deviceSvc.getDevices()
  }

  @Get(':deviceId/versions/:version')
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

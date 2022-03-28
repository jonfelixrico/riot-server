import { Controller, Get, Param } from '@nestjs/common'
import { DeviceService } from 'src/services/generic-devices/device-service.abstract'

@Controller('api/devices')
export class DevicesController {
  constructor(private deviceSvc: DeviceService) {}

  @Get()
  async listDevices() {
    return await this.deviceSvc.getDevices()
  }

  @Get(':deviceId/versions/:version')
  async getDeviceInfo(
    @Param('deviceId') deviceId: string,
    @Param('version') firmwareVersion: string,
  ) {
    return await this.deviceSvc.getDevice({
      deviceId,
      firmwareVersion,
    })
  }
}

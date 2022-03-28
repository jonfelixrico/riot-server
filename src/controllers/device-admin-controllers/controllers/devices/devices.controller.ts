import { Controller, Get, Param } from '@nestjs/common'
import { DeviceService } from 'src/services/generic-devices/device-service.abstract'

@Controller('api/devices')
export class DevicesController {
  constructor(private deviceSvc: DeviceService) {}

  @Get()
  async listDevices() {
    return await this.deviceSvc.getDevices()
  }

  @Get(':deviceId/version')
  async listDeviceVersions() {
    throw new Error('noop')
  }

  @Get(':deviceId/version/:version')
  async getDeviceInfo(
    @Param('deviceId') deviceId: string,
    @Param('version') firmwareVersion: string,
  ) {
    // return await this.deviceSvc.getDevice(deviceId)
    throw new Error('noop')
  }
}

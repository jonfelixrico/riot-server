import { Controller, Get, Param } from '@nestjs/common'
import { DeviceService } from 'src/services/device-service.abstract'

@Controller('api/devices')
export class DevicesController {
  constructor(private deviceSvc: DeviceService) {}

  @Get()
  async listDevices() {
    return await this.deviceSvc.getDevices()
  }

  @Get(':deviceId')
  async getDevice(@Param('deviceId') deviceId: string) {
    return await this.deviceSvc.getDevice(deviceId)
  }
}

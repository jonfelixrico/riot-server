import { Controller, Get, Param } from '@nestjs/common'

@Controller('api/devices/unregistered')
export class DeviceRegistrationController {
  @Get()
  async getDevicesForRegistration() {
    throw new Error('noop')
  }

  @Get(':deviceId/versions/:version')
  async getDeviceForRegistration(
    @Param('deviceId') deviceId: string,
    @Param('version') firmwareVersion: string,
  ) {
    throw new Error('noop')
  }

  @Get(':deviceId/versions/:version')
  async registerDevice(
    @Param('deviceId') deviceId: string,
    @Param('version') firmwareVersion: string,
  ) {
    throw new Error('noop')
  }
}

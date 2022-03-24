import { Controller, Get, Param, Put } from '@nestjs/common'

@Controller('api/devices')
export class DevicesController {
  @Get()
  listDevices() {
    throw new Error('noop')
  }

  @Get(':deviceId')
  getDevice(@Param('deviceId') deviceId: string) {
    throw new Error('noop')
  }

  @Put(':deviceId')
  updateDeviceModules(@Param('deviceId') deviceId: string) {
    throw new Error('noop')
  }

  @Put(':deviceId/modules/:moduleId')
  updateDeviceModule(
    @Param('deviceId') deviceId: string,
    @Param('moduleId') moduleId: string,
  ) {
    throw new Error('noop')
  }
}

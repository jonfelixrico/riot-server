import { Controller, Get, Param, Post } from '@nestjs/common'

@Controller('api/devices/unknown')
export class UnknownDevicesController {
  @Get()
  getUnknownDevices() {
    throw new Error('noop')
  }

  @Get('deviceId')
  getUnknownDevice(@Param('deviceId') deviceId: string) {
    throw new Error('noop')
  }

  @Post('deviceId')
  acknowledgeDevice(@Param('deviceId') deviceId: string) {
    throw new Error('noop')
  }
}

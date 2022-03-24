import { Controller, Get, Param, Put } from '@nestjs/common'

@Controller('api/devices/:deviceId/modules/switch')
export class SwitchController {
  @Get()
  getSwitches(@Param('deviceId') deviceId: string) {
    throw new Error('noop')
  }

  @Put(':switchId')
  updateSwitchSettings(
    @Param('deviceId') deviceId: string,
    @Param('switchId') switchId: string,
  ) {
    throw new Error('noop')
  }
}

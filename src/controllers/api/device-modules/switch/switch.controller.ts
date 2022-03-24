import { Body, Controller, Get, Param, Put } from '@nestjs/common'
import { SwitchScheduleDto } from './switch-schedule.dto'

@Controller('api/devices/:deviceId/modules/switch')
export class SwitchController {
  @Get()
  getSwitches(@Param('deviceId') deviceId: string) {
    throw new Error('noop')
  }

  @Put(':switchId')
  updateSwitchSchedule(
    @Param('deviceId') deviceId: string,
    @Param('switchId') switchId: string,
    @Body() schedule: SwitchScheduleDto,
  ) {
    throw new Error('noop')
  }
}

import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common'
import { SwitchOverrideDto } from './switch-override.dto'
import { SwitchScheduleDto } from './switch-schedule.dto'

@Controller('api/devices/:deviceId/modules/switch')
export class SwitchController {
  @Get()
  getSwitches(@Param('deviceId') deviceId: string) {
    throw new Error('noop')
  }

  @Put(':switchId')
  setSwitchSchedule(
    @Param('deviceId') deviceId: string,
    @Param('switchId') switchId: string,
    @Body() schedule: SwitchScheduleDto,
  ) {
    throw new Error('noop')
  }

  @Put(':switchId/override')
  overrideSwitchSchedule(
    @Param('deviceId') deviceId: string,
    @Param('switchId') switchId: string,
    @Body() override: SwitchOverrideDto,
  ) {
    throw new Error('noop')
  }

  @Delete(':switchId/override')
  clearSwitchScheduleOverride(
    @Param('deviceId') deviceId: string,
    @Param('switchId') switchId: string,
  ) {
    throw new Error('noop')
  }
}

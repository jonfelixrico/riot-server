import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common'
import { SwitchOverrideDto } from './switch-override.dto'
import { SwitchScheduleDto } from './switch-schedule.dto'

@Controller('api/devices/:deviceId/modules/switch')
export class SwitchController {
  @Get(':switchId')
  getDetails(
    @Param('deviceId') deviceId: string,
    @Param('switchId') switchId: string,
  ) {
    throw new Error('noop')
  }

  @Get(':switchId/state')
  getState(
    @Param('deviceId') deviceId: string,
    @Param('switchId') switchId: string,
  ) {
    throw new Error('noop')
  }

  @Put(':switchId')
  setSchedule(
    @Param('deviceId') deviceId: string,
    @Param('switchId') switchId: string,
    @Body() schedule: SwitchScheduleDto,
  ) {
    throw new Error('noop')
  }

  @Put(':switchId/override')
  setOverride(
    @Param('deviceId') deviceId: string,
    @Param('switchId') switchId: string,
    @Body() override: SwitchOverrideDto,
  ) {
    throw new Error('noop')
  }

  @Delete(':switchId/override')
  clearOverride(
    @Param('deviceId') deviceId: string,
    @Param('switchId') switchId: string,
  ) {
    throw new Error('noop')
  }
}

import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common'
import { SwitchOverrideDto } from './switch-override.dto'
import { SwitchScheduleDto } from './switch-schedule.dto'

@Controller('api/devices/:deviceId/modules/switch')
export class SwitchController {
  /**
   * Gets the full details of a switch.
   * @param deviceId
   * @param switchId
   */
  @Get(':switchId')
  getDetails(
    @Param('deviceId') deviceId: string,
    @Param('switchId') switchId: string,
  ) {
    throw new Error('noop')
  }

  /**
   * Updates the schedule of a switch.
   * @param deviceId
   * @param switchId
   * @param schedule
   */
  @Put(':switchId')
  setSchedule(
    @Param('deviceId') deviceId: string,
    @Param('switchId') switchId: string,
    @Body() schedule: SwitchScheduleDto,
  ) {
    throw new Error('noop')
  }

  /**
   * Gets the current state of a switch.
   * @param deviceId
   * @param switchId
   */
  @Get(':switchId/state')
  getState(
    @Param('deviceId') deviceId: string,
    @Param('switchId') switchId: string,
  ) {
    throw new Error('noop')
  }

  /**
   * Overrides the state of a switch.
   * @param deviceId
   * @param switchId
   * @param override
   */
  @Put(':switchId/state')
  setOverride(
    @Param('deviceId') deviceId: string,
    @Param('switchId') switchId: string,
    @Body() override: SwitchOverrideDto,
  ) {
    throw new Error('noop')
  }

  /**
   * Clears the override of a switch.
   * @param deviceId
   * @param switchId
   */
  @Delete(':switchId/state')
  clearOverride(
    @Param('deviceId') deviceId: string,
    @Param('switchId') switchId: string,
  ) {
    throw new Error('noop')
  }
}

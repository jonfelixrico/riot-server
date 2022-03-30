import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Put,
} from '@nestjs/common'
import {
  SwitchManager,
  SWITCH_MANAGER,
} from 'src/services/specialized-devices/switch-manager.interface'
import { SwitchOverrideDto } from './switch-override.dto'
import { SwitchScheduleDto } from './switch-schedule.dto'

@Controller('api/devices/:deviceId/version/:version/modules/switch')
export class SwitchController {
  constructor(@Inject(SWITCH_MANAGER) private switchSvc: SwitchManager) {}

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
  async setSchedule(
    @Param('deviceId') deviceId: string,
    @Param('switchId') switchId: string,
    @Param('version') firmwareVersion: string,
    @Body() { schedule }: SwitchScheduleDto,
  ): Promise<void> {
    await this.switchSvc.setSchedule(
      {
        deviceId,
        moduleId: switchId,
        firmwareVersion,
      },
      schedule,
    )
  }

  /**
   * Gets the current state of a switch.
   * @param deviceId
   * @param switchId
   */
  @Get(':switchId/state')
  async getState(
    @Param('deviceId') deviceId: string,
    @Param('switchId') moduleId: string,
    @Param('version') firmwareVersion: string,
  ) {
    const state = await this.switchSvc.getState({
      deviceId,
      moduleId,
      firmwareVersion,
    })

    return {
      state,
    }
  }

  /**
   * Overrides the state of a switch.
   * @param deviceId
   * @param switchId
   * @param override
   */
  @Put(':switchId/override')
  async setOverride(
    @Param('deviceId') deviceId: string,
    @Param('switchId') moduleId: string,
    @Param('version') firmwareVersion: string,
    @Body() override: SwitchOverrideDto,
  ) {
    await this.switchSvc.setOverride(
      {
        deviceId,
        moduleId,
        firmwareVersion,
      },
      override,
    )
  }

  /**
   * Clears the override of a switch.
   * @param deviceId
   * @param switchId
   */
  @Delete(':switchId/override')
  async clearOverride(
    @Param('deviceId') deviceId: string,
    @Param('switchId') moduleId: string,
    @Param('version') firmwareVersion: string,
  ) {
    await this.switchSvc.setOverride({
      deviceId,
      moduleId,
      firmwareVersion,
    })
  }
}

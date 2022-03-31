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
} from '@app/services/specialized-devices/switch-manager.interface'
import { SwitchOverrideDto } from './switch-override.dto'
import { SwitchScheduleDto } from './switch-schedule.dto'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('switch')
@Controller('api/devices/:deviceId/version/:version/switch/:moduleId')
export class SwitchController {
  constructor(@Inject(SWITCH_MANAGER) private switchSvc: SwitchManager) {}

  /**
   * Gets the full details of a switch.
   * @param deviceId
   * @param moduleId
   */
  @Get(':moduleId')
  getDetails(
    @Param('deviceId') deviceId: string,
    @Param('moduleId') moduleId: string,
    @Param('version') firmwareVersion: string,
  ) {
    return this.switchSvc.getConfig({ deviceId, moduleId, firmwareVersion })
  }

  /**
   * Updates the schedule of a switch.
   * @param deviceId
   * @param moduleId
   * @param schedule
   */
  @Put(':moduleId')
  async setSchedule(
    @Param('deviceId') deviceId: string,
    @Param('moduleId') moduleId: string,
    @Param('version') firmwareVersion: string,
    @Body() { schedule }: SwitchScheduleDto,
  ): Promise<void> {
    await this.switchSvc.setSchedule(
      {
        deviceId,
        moduleId: moduleId,
        firmwareVersion,
      },
      schedule,
    )
  }

  /**
   * Gets the current state of a switch.
   * @param deviceId
   * @param moduleId
   */
  @Get(':moduleId/state')
  async getState(
    @Param('deviceId') deviceId: string,
    @Param('moduleId') moduleId: string,
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
   * @param moduleId
   * @param override
   */
  @Put(':moduleId/override')
  async setOverride(
    @Param('deviceId') deviceId: string,
    @Param('moduleId') moduleId: string,
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
   * @param moduleId
   */
  @Delete(':moduleId/override')
  async clearOverride(
    @Param('deviceId') deviceId: string,
    @Param('moduleId') moduleId: string,
    @Param('version') firmwareVersion: string,
  ) {
    await this.switchSvc.setOverride({
      deviceId,
      moduleId,
      firmwareVersion,
    })
  }
}

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
import { SwitchOverrideDto } from '@dto/switch-override.dto'
import {
  ApiBody,
  ApiExtraModels,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger'
import { SwitchConfigDto } from '@dto/switch-config.dto'
import { DailyScheduleDto } from '@dto/daily-schedule.dto'
import { WeeklyScheduleDto } from '@dto/weekly-schedule.dto'
import { ISwitchStateDto, SwitchStateDto } from '@dto/switch-state.dto'

@ApiTags('switch')
@Controller('api/device/:deviceId/version/:version/switch/:moduleId')
export class SwitchController {
  constructor(@Inject(SWITCH_MANAGER) private switchSvc: SwitchManager) {}

  /**
   * Gets the full details of a switch.
   * @param deviceId
   * @param moduleId
   */
  @Get()
  @ApiOkResponse({
    type: SwitchConfigDto,
  })
  @ApiNotFoundResponse()
  getDetails(
    @Param('deviceId') deviceId: string,
    @Param('moduleId') moduleId: string,
    @Param('version') firmwareVersion: string,
  ) {
    // TODO do existence checking
    return this.switchSvc.getConfig({ deviceId, moduleId, firmwareVersion })
  }

  /**
   * Updates the schedule of a switch.
   * @param deviceId
   * @param moduleId
   * @param schedule
   */
  @Put()
  @ApiExtraModels(DailyScheduleDto, WeeklyScheduleDto)
  @ApiBody({
    schema: {
      anyOf: [
        { $ref: getSchemaPath(DailyScheduleDto) },
        { $ref: getSchemaPath(WeeklyScheduleDto) },
      ],
    },
  })
  @ApiOkResponse()
  @ApiNotFoundResponse()
  async setSchedule(
    @Param('deviceId') deviceId: string,
    @Param('moduleId') moduleId: string,
    @Param('version') firmwareVersion: string,
    @Body() schedule: DailyScheduleDto | WeeklyScheduleDto,
  ): Promise<void> {
    // TODO do existence checking
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
  @Get('state')
  @ApiOkResponse({
    type: SwitchStateDto,
  })
  @ApiNotFoundResponse()
  async getState(
    @Param('deviceId') deviceId: string,
    @Param('moduleId') moduleId: string,
    @Param('version') firmwareVersion: string,
  ): Promise<ISwitchStateDto> {
    // TODO do existence checking
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
  @Put('override')
  @ApiNotFoundResponse()
  async setOverride(
    @Param('deviceId') deviceId: string,
    @Param('moduleId') moduleId: string,
    @Param('version') firmwareVersion: string,
    @Body() override: SwitchOverrideDto,
  ) {
    // TODO do existence checking
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
  @Delete('override')
  @ApiNotFoundResponse()
  @ApiForbiddenResponse({
    description: 'There are already no overrides.',
  })
  async clearOverride(
    @Param('deviceId') deviceId: string,
    @Param('moduleId') moduleId: string,
    @Param('version') firmwareVersion: string,
  ) {
    // TODO do general existence checking
    // TODO check override existence checking
    await this.switchSvc.setOverride({
      deviceId,
      moduleId,
      firmwareVersion,
    })
  }
}

import { SwitchConfig } from '@app/services/specialized-devices/switch-manager.interface'
import { ApiExtraModels, ApiProperty, getSchemaPath } from '@nestjs/swagger'
import { DailyScheduleDto } from './daily-schedule.dto'
import { SwitchOverrideDto } from './switch-override.dto'
import { WeeklyScheduleDto } from './weekly-schedule.dto'

export class SwitchConfigDto implements SwitchConfig {
  @ApiExtraModels(DailyScheduleDto, WeeklyScheduleDto)
  @ApiProperty({
    oneOf: [
      {
        $ref: getSchemaPath(DailyScheduleDto),
      },
      {
        $ref: getSchemaPath(WeeklyScheduleDto),
      },
    ],
  })
  schedule: DailyScheduleDto | WeeklyScheduleDto
  override?: SwitchOverrideDto
}

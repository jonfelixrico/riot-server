import { SwitchConfig } from '@app/services/specialized-devices/switch-manager.interface'
import { ApiExtraModels, ApiProperty, getSchemaPath } from '@nestjs/swagger'
import { DailyScheduleDto } from './daily-schedule.dto'
import { SwitchOverrideDto } from './switch-override.dto'
import { WeeklyScheduleDto } from './weekly-schedule.dto'
import { ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'
import { BaseScheduleDto } from './base-schedule.dto'

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
  @ValidateNested()
  @Type(() => BaseScheduleDto, {
    keepDiscriminatorProperty: true,
    discriminator: {
      property: 'type',
      subTypes: [
        {
          name: 'WEEKLY',
          value: WeeklyScheduleDto,
        },
        {
          name: 'DAILY',
          value: DailyScheduleDto,
        },
      ],
    },
  })
  schedule: DailyScheduleDto | WeeklyScheduleDto

  @ValidateNested()
  override?: SwitchOverrideDto
}

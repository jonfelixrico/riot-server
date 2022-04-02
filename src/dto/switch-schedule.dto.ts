import { ValidateNested } from 'class-validator'
import { BaseScheduleDto } from './base-schedule.dto'
import { WeeklyScheduleDto } from './weekly-schedule.dto'
import { DailyScheduleDto } from './daily-schedule.dto'
import { Type } from 'class-transformer'

export class SwitchScheduleDto {
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
}

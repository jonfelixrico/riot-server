import {
  DailySchedule,
  ScheduleUtcOffset,
} from '@app/services/specialized-devices/switch-manager.interface'
import { ScheduleEntryDto } from './schedule-entry.dto'
import { ValidateNested, IsArray, Equals, IsNotEmpty } from 'class-validator'
import { BaseScheduleDto } from './base-schedule.dto'
import { IsUtc } from '@app/validators/utc.validator'

export class DailyScheduleDto extends BaseScheduleDto implements DailySchedule {
  @Equals('DAILY')
  type: 'DAILY'

  @ValidateNested()
  @IsArray()
  dailySchedule: ScheduleEntryDto[]

  @IsNotEmpty()
  @IsUtc()
  utcOffset: ScheduleUtcOffset
}

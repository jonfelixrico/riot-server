import {
  DailySchedule,
  ScheduleUtcOffset,
} from '@app/services/specialized-devices/switch-manager.interface'
import { ScheduleEntryDto } from './schedule-entry.dto'
import { ValidateNested, IsArray, Equals, IsNotEmpty } from 'class-validator'

export class DailyScheduleDto implements DailySchedule {
  @Equals('DAILY')
  type: 'DAILY'

  @ValidateNested()
  @IsArray()
  dailySchedule: ScheduleEntryDto[]

  // TODO add regexp validation here
  @IsNotEmpty()
  utcOffset: ScheduleUtcOffset
}

import {
  ScheduleUtcOffset,
  WeeklySchedule,
} from '@app/services/specialized-devices/switch-manager.interface'
import { ScheduleEntryDto } from './schedule-entry.dto'
import { ValidateNested, Equals, IsObject, IsArray } from 'class-validator'
import { BaseScheduleDto } from './base-schedule.dto'
import { IsUtc } from '@app/validators/utc.validator'

type WeeklyScheduleSubObject = WeeklySchedule['weeklySchedule']

class WeeklySchedleSubObjectDto implements WeeklyScheduleSubObject {
  @ValidateNested()
  @IsArray()
  sun: ScheduleEntryDto[]

  @ValidateNested()
  @IsArray()
  mon: ScheduleEntryDto[]

  @ValidateNested()
  @IsArray()
  tues: ScheduleEntryDto[]

  @ValidateNested()
  @IsArray()
  wed: ScheduleEntryDto[]

  @ValidateNested()
  @IsArray()
  thurs: ScheduleEntryDto[]

  @ValidateNested()
  @IsArray()
  fri: ScheduleEntryDto[]

  @ValidateNested()
  @IsArray()
  sat: ScheduleEntryDto[]
}

export class WeeklyScheduleDto
  extends BaseScheduleDto
  implements WeeklySchedule
{
  @Equals('WEEKLY')
  type: 'WEEKLY'

  @ValidateNested()
  @IsObject()
  weeklySchedule: WeeklySchedleSubObjectDto

  @IsUtc()
  utcOffset: ScheduleUtcOffset
}

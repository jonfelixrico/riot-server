import {
  ScheduleUtcOffset,
  WeeklySchedule,
} from '@app/services/specialized-devices/switch-manager.interface'
import { ScheduleEntryDto } from './schedule-entry.dto'
import { ValidateNested, Equals, IsObject, IsArray } from 'class-validator'

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

export class WeeklyScheduleDto implements WeeklySchedule {
  @Equals('WEEKLY')
  type: 'WEEKLY'

  @ValidateNested()
  @IsObject()
  weeklySchedule: WeeklySchedleSubObjectDto

  // TODO add regexp validation
  utcOffset: ScheduleUtcOffset
}

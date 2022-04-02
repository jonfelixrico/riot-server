import {
  ScheduleUtcOffset,
  WeeklySchedule,
} from '@app/services/specialized-devices/switch-manager.interface'
import { ScheduleEntryDto } from './schedule-entry.dto'

export class WeeklyScheduleDto implements WeeklySchedule {
  type: 'WEEKLY'
  weeklySchedule: {
    sun: ScheduleEntryDto[]
    mon: ScheduleEntryDto[]
    tues: ScheduleEntryDto[]
    wed: ScheduleEntryDto[]
    thurs: ScheduleEntryDto[]
    fri: ScheduleEntryDto[]
    sat: ScheduleEntryDto[]
  }
  utcOffset: ScheduleUtcOffset
}

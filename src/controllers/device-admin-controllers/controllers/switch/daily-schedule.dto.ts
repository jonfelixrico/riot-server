import {
  DailySchedule,
  ScheduleUtcOffset,
} from '@app/services/specialized-devices/switch-manager.interface'
import { ScheduleEntryDto } from './schedule-entry.dto'

export class DailyScheduleDto implements DailySchedule {
  type: 'DAILY'
  dailySchedule: ScheduleEntryDto[]
  utcOffset: ScheduleUtcOffset
}

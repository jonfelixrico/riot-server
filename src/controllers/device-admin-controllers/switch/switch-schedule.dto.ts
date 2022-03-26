import {
  DailySchedule,
  HourlySchedule,
  WeeklySchedule,
} from 'src/services/switch-module-service.abstract'

export class SwitchScheduleDto {
  schedule: DailySchedule | WeeklySchedule | HourlySchedule
}

import {
  DailySchedule,
  HourlySchedule,
  WeeklySchedule,
} from 'src/services/specialized-devices/switch/switch-module-service.abstract'

export class SwitchScheduleDto {
  schedule: DailySchedule | WeeklySchedule | HourlySchedule
}

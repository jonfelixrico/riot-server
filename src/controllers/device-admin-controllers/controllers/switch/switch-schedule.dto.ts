import {
  DailySchedule,
  HourlySchedule,
  WeeklySchedule,
} from 'src/services/specialized-devices/switch/switch-manager.interface'

export class SwitchScheduleDto {
  schedule: DailySchedule | WeeklySchedule | HourlySchedule
}

import {
  DailySchedule,
  HourlySchedule,
  WeeklySchedule,
} from 'src/services/switch-actuator-service.abstract'

export class SwitchScheduleDto {
  schedule: DailySchedule | WeeklySchedule | HourlySchedule
}

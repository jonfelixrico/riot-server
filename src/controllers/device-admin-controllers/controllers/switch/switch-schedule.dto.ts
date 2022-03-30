import {
  DailySchedule,
  WeeklySchedule,
} from '@app/services/specialized-devices/switch-manager.interface'

export class SwitchScheduleDto {
  schedule: DailySchedule | WeeklySchedule
}

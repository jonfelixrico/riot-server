import { ValidateNested } from 'class-validator'
import {
  DailySchedule,
  WeeklySchedule,
} from '@app/services/specialized-devices/switch-manager.interface'

export class SwitchScheduleDto {
  @ValidateNested()
  // TODO find appropriate validator for union types
  schedule: DailySchedule | WeeklySchedule
}

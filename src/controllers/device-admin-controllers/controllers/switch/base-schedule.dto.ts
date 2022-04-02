import {
  BaseSchedule,
  ScheduleUtcOffset,
} from '@app/services/specialized-devices/switch-manager.interface'
import { IsUtc } from '@app/validators/utc.validator'

export class BaseScheduleDto implements BaseSchedule {
  @IsUtc()
  utcOffset: ScheduleUtcOffset
  type: 'DAILY' | 'WEEKLY'
}

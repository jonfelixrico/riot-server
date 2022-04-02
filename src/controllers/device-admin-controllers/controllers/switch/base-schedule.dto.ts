import {
  BaseSchedule,
  ScheduleUtcOffset,
} from '@app/services/specialized-devices/switch-manager.interface'

export class BaseScheduleDto implements BaseSchedule {
  utcOffset: ScheduleUtcOffset
  type: 'DAILY' | 'WEEKLY'
}

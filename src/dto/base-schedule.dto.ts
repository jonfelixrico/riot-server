import {
  BaseSchedule,
  ScheduleUtcOffset,
} from '@app/services/specialized-devices/switch-manager.interface'

// No validators here because this is not exposed directly
export class BaseScheduleDto implements BaseSchedule {
  utcOffset: ScheduleUtcOffset
  type: 'DAILY' | 'WEEKLY'
}

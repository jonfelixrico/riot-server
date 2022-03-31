import {
  ScheduleEntry,
  ScheduleTime,
  SwitchState,
} from '@app/services/specialized-devices/switch-manager.interface'

export class ScheduleTimeDto implements ScheduleTime {
  minute: number
  hour: number
  second: number
}

export class ScheduleEntryDto implements ScheduleEntry {
  start: ScheduleTimeDto
  end: ScheduleTimeDto
  state: SwitchState
}

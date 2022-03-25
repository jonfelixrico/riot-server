export type SwitchState = 'on' | 'off'

export interface ScheduleEntry {
  /**
   * Must follow the time section of an ISO8601 date.
   */
  start: string

  /**
   * Must follow the time section of an ISO8601 date.
   */
  end: string
  state: SwitchState
}

/**
 * Schedule in a daily cycle.
 */
export interface DailySchedule {
  /**
   * The `start` and `end` dates specified in the schedule will operate under this
   * timezone.
   */
  timezoneOffset: number
  schedule: ScheduleEntry[]
  type: 'DAILY'
}

/**
 * Schedule in a weekly cycle.
 */
export interface WeeklySchedule {
  /**
   * The `start` and `end` dates specified in the schedules for all days
   * will operate under this timezone.
   */
  timezoneOffset: number
  type: 'WEEKLY'

  /**
   * Schedule for each day of the week.
   * Starts with Sunday and ends with Saturday.
   */
  sun: ScheduleEntry[]
  mon: ScheduleEntry[]
  tues: ScheduleEntry[]
  wed: ScheduleEntry[]
  thurs: ScheduleEntry[]
  fri: ScheduleEntry[]
  sat: ScheduleEntry[]
}

export interface SwitchOverride {
  state: SwitchState
  overrideUntil?: Date
}

export interface SwitchConfig {
  schedule: DailySchedule | WeeklySchedule

  /**
   * If not null, then that means that the switch's schedule is being overridden.
   */
  override?: SwitchOverride
}

export abstract class SwitchActuatorService {
  /**
   * Get the state of a specific switch in a device.
   * @param deviceId
   * @param moduleId
   */
  abstract getState(deviceId: string, moduleId: string): Promise<'on' | 'off'>

  /**
   * Get the state of all switches in a device.
   * @param deviceId
   */
  abstract getState(deviceId: string): Promise<
    {
      id: string
      state: SwitchState
    }[]
  >
}

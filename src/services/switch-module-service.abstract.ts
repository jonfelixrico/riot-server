export type SwitchState = 'ON' | 'OFF'

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
  dailySchedule: ScheduleEntry[]
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

  weeklySchedule: {
    sun: ScheduleEntry[]
    mon: ScheduleEntry[]
    tues: ScheduleEntry[]
    wed: ScheduleEntry[]
    thurs: ScheduleEntry[]
    fri: ScheduleEntry[]
    sat: ScheduleEntry[]
  }
}

export interface HourlySchedule {
  /**
   * The reference time for the minutes will follow the offset specified.
   */
  timezoneOffset: number
  type: 'HOURLY'
  hourlySchedule: {
    minute: number
    state: SwitchState
  }[]
}

export interface Override {
  state: SwitchState
  overrideUntil?: Date
}

type Schedule = DailySchedule | WeeklySchedule | HourlySchedule

export interface SwitchConfig {
  schedule: Schedule

  /**
   * If not null, then that means that the switch's schedule is being overridden.
   */
  override?: Override
}

export abstract class SwitchModuleService {
  /**
   * Get the state of a specific switch in a device.
   * @param deviceId
   * @param moduleId
   */
  abstract getState(deviceId: string, moduleId: string): Promise<'on' | 'off'>

  /**
   * Sets the on/off schedule of a switch.
   *
   * @param deviceId
   * @param moduleId
   * @param schedule The updated schedule of the switch.
   */
  abstract setSchedule(
    deviceId: string,
    moduleId: string,
    schedule: Schedule,
  ): Promise<void>

  /**
   * Updates or clears the override of a switch.
   *
   * @param deviceId
   * @param moduleId
   * @param override If not null, then this will be the new overrides of the switch. Else,
   * it clears any overrides.
   */
  abstract setOverride(
    deviceId: string,
    moduleId: string,
    override: Override | null,
  ): Promise<void>
}

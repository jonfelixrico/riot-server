export type SwitchState = 'ON' | 'OFF'

export type ScheduleUtcOffset<offset extends string = string> =
  | `UTC+${offset}`
  | `UTC-${offset}`

export interface BaseSchedule {
  utcOffset: ScheduleUtcOffset
  type: 'DAILY' | 'WEEKLY' | 'HOURLY'
}

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
export interface DailySchedule extends BaseSchedule {
  type: 'DAILY'
  dailySchedule: ScheduleEntry[]
}

/**
 * Schedule in a weekly cycle.
 */
export interface WeeklySchedule extends BaseSchedule {
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

export interface HourlySchedule extends BaseSchedule {
  type: 'HOURLY'
  hourlySchedule: {
    /**
     * In minutes of the hour.
     */
    start: number

    /**
     * In minutes of the hour.
     */
    end: number

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
  abstract getState(deviceId: string, moduleId: string): Promise<SwitchState>

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

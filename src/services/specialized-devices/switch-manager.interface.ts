import { UtcOffset } from '@app/types/datetime.types'
import { ModuleQuery } from '@app/types/query-common.types'

export type SwitchState = 'ON' | 'OFF'
export type ScheduleUtcOffset = UtcOffset

export interface BaseSchedule {
  utcOffset: ScheduleUtcOffset
  type: 'DAILY' | 'WEEKLY'
}

export interface ScheduleTime {
  minute: number
  hour: number
  second: number
}

export interface ScheduleEntry {
  start: ScheduleTime

  end: ScheduleTime
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

export interface Override {
  state: SwitchState
  overrideUntil?: Date
}

type Schedule = DailySchedule | WeeklySchedule

export interface SwitchConfig {
  schedule: Schedule

  /**
   * If not null, then that means that the switch's schedule is being overridden.
   */
  override?: Override
}

export interface SwitchManager {
  /**
   * Get the state of a specific switch in a device.
   * @param deviceId
   * @param moduleId
   */
  getState(query: ModuleQuery): Promise<SwitchState>

  /**
   * Sets the on/off schedule of a switch.
   */
  setSchedule(query: ModuleQuery, schedule: Schedule): Promise<void>

  /**
   * Clears the override.
   */
  setOverride(query: ModuleQuery): Promise<void>
  setOverride(query: ModuleQuery, override: null): Promise<void>

  /**
   * Updates updates the override of the switch.
   */
  setOverride(query: ModuleQuery, override: Override): Promise<void>

  getConfig(query: ModuleQuery): Promise<SwitchConfig>
}

export const SWITCH_MANAGER = Symbol('switch manager')

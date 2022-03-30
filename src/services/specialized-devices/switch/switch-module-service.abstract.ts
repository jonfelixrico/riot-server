export type SwitchState = 'ON' | 'OFF'

type SingleDigit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

export type ScheduleUtcOffset =
  | `+${SingleDigit}${SingleDigit}:${SingleDigit}${SingleDigit}`
  | `+${SingleDigit}`
  | `-${SingleDigit}${SingleDigit}:${SingleDigit}${SingleDigit}`
  | `-${SingleDigit}`

interface BaseSchedule {
  utcOffset: ScheduleUtcOffset
  type: 'DAILY' | 'WEEKLY' | 'HOURLY'
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

export interface HourlySchedule extends BaseSchedule {
  type: 'HOURLY'
  hourlySchedule: {
    /**
     * In minutes of the hour.
     */
    start: {
      minute: number
      second: number
    }

    /**
     * In minutes of the hour.
     */
    end: {
      minute: number
      second: number
    }

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

export abstract class SwitchModuleService implements SwitchManager {
  /**
   * Get the state of a specific switch in a device.
   * @param deviceId
   * @param moduleId
   */
  abstract getState(input: {
    deviceId: string
    moduleId: string
    firmwareVersion: string
  }): Promise<SwitchState>

  /**
   * Sets the on/off schedule of a switch.
   *
   * @param deviceId
   * @param moduleId
   * @param schedule The updated schedule of the switch.
   */
  abstract setSchedule(
    input: {
      deviceId: string
      moduleId: string
      firmwareVersion: string
    },
    schedule: Schedule,
  ): Promise<void>

  /**
   * Clears the override.
   * @param deviceId
   * @param moduleId
   */
  abstract setOverride(input: {
    deviceId: string
    moduleId: string
    firmwareVersion: string
  }): Promise<void>

  abstract setOverride(
    input: {
      deviceId: string
      moduleId: string
      firmwareVersion: string
    },
    override: null,
  ): Promise<void>

  /**
   * Updates updates the override of the switch.
   *
   * @param deviceId
   * @param moduleId
   * @param override The updated override.
   */
  abstract setOverride(
    input: {
      deviceId: string
      moduleId: string
      firmwareVersion: string
    },
    override: Override,
  ): Promise<void>
}

export interface SwitchManager {
  /**
   * Get the state of a specific switch in a device.
   * @param deviceId
   * @param moduleId
   */
  getState(input: {
    deviceId: string
    moduleId: string
    firmwareVersion: string
  }): Promise<SwitchState>

  /**
   * Sets the on/off schedule of a switch.
   *
   * @param deviceId
   * @param moduleId
   * @param schedule The updated schedule of the switch.
   */
  setSchedule(
    input: {
      deviceId: string
      moduleId: string
      firmwareVersion: string
    },
    schedule: Schedule,
  ): Promise<void>

  /**
   * Clears the override.
   * @param deviceId
   * @param moduleId
   */
  setOverride(input: {
    deviceId: string
    moduleId: string
    firmwareVersion: string
  }): Promise<void>

  setOverride(
    input: {
      deviceId: string
      moduleId: string
      firmwareVersion: string
    },
    override: null,
  ): Promise<void>

  /**
   * Updates updates the override of the switch.
   *
   * @param deviceId
   * @param moduleId
   * @param override The updated override.
   */
  setOverride(
    input: {
      deviceId: string
      moduleId: string
      firmwareVersion: string
    },
    override: Override,
  ): Promise<void>
}

export const SWITCH_MANAGER = Symbol('switch manager')

interface Interval {
  /**
   * In ISO8601 time format.
   */
  start: string

  /**
   * In ISO8601 time format.
   */
  end: string

  /**
   * Dictates the state of the switch in thsi interval.
   */
  state: 'on' | 'off'
}

export class SwitchScheduleDto {
  intervals: Interval[]
  tzOffset: number
}

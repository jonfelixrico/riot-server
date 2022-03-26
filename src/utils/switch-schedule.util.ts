import { DateTime } from 'luxon'
import {
  DailySchedule,
  HourlySchedule,
  ScheduleEntry,
  SwitchState,
  WeeklySchedule,
} from 'src/services/specialized-devices/switch/switch-module-service.abstract'
import { isBetween } from './luxon.utils'

enum WeeklyScheduleLuxonMapping {
  mon = 1,
  tue = 2,
  wed = 3,
  thurs = 4,
  fri = 5,
  sat = 6,
  sun = 7,
}

/**
 * Creates a DateTime object based on the time provided. The date will be the current system date.
 * @param timeString ISO 8601 compliant time.
 * @param utcOffset ISO8601 compliant UTC offset, should be in luxon techie format.
 * @returns
 */
function createDtFromTime(timeString: string, utcOffset: string) {
  return DateTime.fromFormat(`${timeString}${utcOffset}`, 'HH:mm:ss ZZZ')
}

/**
 * Tries to find an item in `entries` where `reference` is between the `start` and `end` date.
 *
 * @param entries Schedule entries.
 * @param utcOffset The utcOffset of the schedules.
 * @param reference This will be compared against the schedules. If not provided then this will take on the current system datetime.
 * @returns SwichState that reflects the state of the switch if a matching schedule was found,
 * null if otherwise.
 */
function computeStateFrom24HSchedule(
  entries: ScheduleEntry[],
  utcOffset: string,
  reference: DateTime,
): SwitchState | null {
  for (const { start, end, state } of entries) {
    const startDt = createDtFromTime(start, utcOffset)
    const endDt = createDtFromTime(end, utcOffset)

    if (isBetween(reference, startDt, endDt)) {
      return state
    }
  }

  return null
}

export function computeDailyState(
  { utcOffset, dailySchedule }: DailySchedule,
  defaultState: SwitchState = 'OFF',
  reference?: DateTime,
) {
  reference = reference ?? DateTime.now()

  return (
    computeStateFrom24HSchedule(dailySchedule, utcOffset, reference) ??
    defaultState
  )
}

export function computeHourlyState(
  { utcOffset, hourlySchedule }: HourlySchedule,
  defaultState: SwitchState = 'OFF',
  reference?: DateTime,
) {
  reference = reference ?? DateTime.now()

  const referenceDt = createDtFromTime('00:00:00', utcOffset)

  for (const { start, end, state } of hourlySchedule) {
    const startDt = referenceDt.set({ minute: start })

    const endDt = referenceDt.set({ minute: end })

    if (isBetween(reference, startDt, endDt)) {
      return state
    }
  }

  return defaultState
}

export function computeWeeklyState(
  { weeklySchedule, utcOffset }: WeeklySchedule,
  defaultState: SwitchState = 'OFF',
  now?: DateTime,
) {
  const luxonWeekdayToShortday = WeeklyScheduleLuxonMapping[now.weekday]
  const scheduleForWeekday = weeklySchedule[luxonWeekdayToShortday]

  return (
    computeStateFrom24HSchedule(scheduleForWeekday, utcOffset, now) ??
    defaultState
  )
}

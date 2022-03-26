import { DateTime } from 'luxon'
import {
  DailySchedule,
  HourlySchedule,
  ScheduleEntry,
  SwitchState,
  WeeklySchedule,
} from 'src/services/specialized-devices/switch/switch-module-service.abstract'
import { isBetween } from './luxon.utils'

type WeeklyScheduleKeys = keyof WeeklySchedule['weeklySchedule']

const LUXON_MAPPING: {
  [key in WeeklyScheduleKeys]: number
} = {
  mon: 1,
  tues: 2,
  wed: 3,
  thurs: 4,
  fri: 5,
  sat: 6,
  sun: 7,
}

/**
 * Creates a DateTime object based on the time provided. The date will be the current system date.
 * @param timeString ISO 8601 compliant time.
 * @param utcOffset ISO8601 compliant UTC offset, should be in luxon techie format.
 * @returns
 */
function createDtFromTime(timeString: string, utcOffset: string) {
  /**
   * 2022-01-01 is just an arbitrary dummy date.
   * It shouldn't matter much since we only pay attention to the time part in these utils.
   */
  return DateTime.fromISO(`2022-01-01T${timeString}${utcOffset}`)
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
  { utcOffset, dailySchedule }: Omit<DailySchedule, 'type'>,
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
  { utcOffset, hourlySchedule }: Omit<HourlySchedule, 'type'>,
  defaultState: SwitchState = 'OFF',
  reference?: DateTime,
) {
  reference = reference ?? DateTime.now()

  for (const { start, end, state } of hourlySchedule) {
    const startDt = createDtFromTime('00:00:00', utcOffset).set({
      minute: start,
    })
    const endDt = createDtFromTime('00:00:00', utcOffset).set({ minute: end })

    if (
      startDt.minute <= reference.minute &&
      endDt.minute >= reference.minute
    ) {
      return state
    }
  }

  return defaultState
}

export function computeWeeklyState(
  { weeklySchedule, utcOffset }: Omit<WeeklySchedule, 'type'>,
  defaultState: SwitchState = 'OFF',
  now?: DateTime,
) {
  const luxonWeekdayToShortday = LUXON_MAPPING[now.weekday]
  const scheduleForWeekday = weeklySchedule[luxonWeekdayToShortday]

  return (
    computeStateFrom24HSchedule(scheduleForWeekday, utcOffset, now) ??
    defaultState
  )
}

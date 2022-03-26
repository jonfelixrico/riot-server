import { DateTime } from 'luxon'
import {
  DailySchedule,
  HourlySchedule,
  ScheduleEntry,
  ScheduleUtcOffset,
  SwitchState,
  WeeklySchedule,
} from 'src/services/specialized-devices/switch/switch-module-service.abstract'
import { isBetween } from './luxon.utils'

const LUXON_MAPPING: {
  [key: number]: keyof WeeklySchedule['weeklySchedule']
} = {
  1: 'mon',
  2: 'tues',
  3: 'wed',
  4: 'thurs',
  5: 'fri',
  6: 'sat',
  7: 'sun',
}

/**
 * Creates a DateTime object based on the time provided. The date will be the current system date.
 * @param timeString ISO 8601 compliant time.
 * @param utcOffset ISO8601 compliant UTC offset, should be in luxon techie format.
 * @returns
 */
function createDtFromTime(timeString: string, utcOffset: ScheduleUtcOffset) {
  /**
   * 2022-01-01 is just an arbitrary dummy date.
   * It shouldn't matter much since we only pay attention to the time part in these utils.
   */
  return DateTime.fromISO(`2022-01-01T${timeString}`).setZone(utcOffset, {
    keepLocalTime: true,
  })
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
  utcOffset: ScheduleUtcOffset,
  reference: DateTime,
): SwitchState | null {
  for (const { start, end, state } of entries) {
    const startDt = createDtFromTime(start, utcOffset)
    const endDt = createDtFromTime(end, utcOffset)

    console.debug(reference.toISO(), startDt.toISO(), start, endDt.toISO(), end)

    if (isBetween(reference, startDt, endDt)) {
      return state
    }
  }

  return null
}

export function computeDailyState(
  { utcOffset, dailySchedule }: Omit<DailySchedule, 'type'>,
  reference?: DateTime,
): SwitchState | null {
  reference = reference ?? DateTime.now()

  return computeStateFrom24HSchedule(dailySchedule, utcOffset, reference)
}

export function computeHourlyState(
  { utcOffset, hourlySchedule }: Omit<HourlySchedule, 'type'>,
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

  return null
}

export function computeWeeklyState(
  { weeklySchedule, utcOffset }: Omit<WeeklySchedule, 'type'>,
  reference?: DateTime,
): SwitchState | null {
  reference = reference?.setZone(utcOffset) ?? DateTime.now().setZone(utcOffset)
  const luxonWeekdayToShortday = LUXON_MAPPING[reference.weekday]
  const scheduleForWeekday = weeklySchedule[luxonWeekdayToShortday]
  console.debug(scheduleForWeekday, luxonWeekdayToShortday)

  return computeStateFrom24HSchedule(scheduleForWeekday, utcOffset, reference)
}

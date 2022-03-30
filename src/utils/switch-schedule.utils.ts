import { DateTime } from 'luxon'
import {
  DailySchedule,
  ScheduleEntry,
  ScheduleUtcOffset,
  SwitchState,
  WeeklySchedule,
} from '@app/services/specialized-devices/switch-manager.interface'
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
  const zonedReference = reference.setZone(`UTC${utcOffset}`)

  for (const { start, end, state } of entries) {
    const startDt = zonedReference.set(start)
    const endDt = zonedReference.set(end)

    if (isBetween(zonedReference, startDt, endDt)) {
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

export function computeWeeklyState(
  { weeklySchedule, utcOffset }: Omit<WeeklySchedule, 'type'>,
  reference?: DateTime,
): SwitchState | null {
  reference = reference ?? DateTime.now()

  const zonedReference = reference.setZone(`UTC${utcOffset}`)

  const luxonWeekdayToShortday = LUXON_MAPPING[zonedReference.weekday]
  const scheduleForWeekday = weeklySchedule[luxonWeekdayToShortday]

  return computeStateFrom24HSchedule(scheduleForWeekday, utcOffset, reference)
}

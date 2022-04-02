import { DateTime, FixedOffsetZone } from 'luxon'

export const EPOCH = DateTime.fromMillis(0, {
  zone: 'UTC',
})

/**
 * Checks if a date is within a given range. Inclusive.
 *
 * @param date The date date to compare against the range.
 * @param from The start of the range.
 * @param to The end of the range.
 * @returns True if is between, false if otherwise.
 */
export function isBetween(date: DateTime, from: DateTime, to: DateTime) {
  return date.diff(from).milliseconds >= 0 && to.diff(date).milliseconds >= 0
}

const UTC_SHORT = /^[+-](\d{1,2})$/
/**
 * We only care about checking the hours hence we don't capture minutes
 * for the HH:MM format hence we don't capture the minutes. We let Luxon
 * take care of the rest.
 */
const UTC_LONG = /^[+-](\d{2}):\d{2}$/

export function isValidUtc(toCheck: string) {
  if (UTC_SHORT.test(toCheck)) {
    const parsed = parseInt(UTC_SHORT.exec(toCheck)[1])
    if (parsed > 14) {
      return false
    }

    return FixedOffsetZone.parseSpecifier(`UTC${toCheck}`)?.isValid
  } else if (UTC_LONG.test(toCheck)) {
    const parsed = parseInt(UTC_LONG.exec(toCheck)[1])
    if (parsed > 14) {
      return false
    }

    return FixedOffsetZone.parseSpecifier(`UTC${toCheck}`)?.isValid
  }

  return false
}

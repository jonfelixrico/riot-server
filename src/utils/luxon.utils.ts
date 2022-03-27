import { DateTime } from 'luxon'

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

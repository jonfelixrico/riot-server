import { DateTime } from 'luxon'

export function isBetween(date: DateTime, from: DateTime, to: DateTime) {
  return date.diff(from).milliseconds >= 0 && to.diff(from).milliseconds >= 0
}

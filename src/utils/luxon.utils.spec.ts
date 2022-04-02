import { DateTime } from 'luxon'
import { isBetween, isValidUtc } from './luxon.utils'

describe('isBetween', () => {
  const start = DateTime.fromISO('2022-01-01T00:00:00Z')
  const end = DateTime.fromISO('2022-31-01T23:59:59Z')
  const helper = (date: DateTime) => isBetween(date, start, end)

  it('it detects if date is out of bounds', () => {
    // before
    expect(helper(DateTime.fromISO('1998-06-21T12:00:00Z'))).toBe(false)
    expect(helper(DateTime.fromISO('1999-01-10T00:00:00Z'))).toBe(false)
    expect(helper(DateTime.fromISO('2021-12-24T23:59:59Z'))).toBe(false)

    // after
    expect(helper(DateTime.fromISO('2022-04-04T03:00:00Z'))).toBe(false)
    expect(helper(DateTime.fromISO('2025-06-16T00:00:00Z'))).toBe(false)
  })

  it('detects if date is within bounds', () => {
    expect(helper(DateTime.fromISO('2022-01-11T00:00:00Z')))
    expect(helper(DateTime.fromISO('2022-01-31T23:59:59Z')))
    expect(helper(DateTime.fromISO('2022-01-01T00:00:00Z')))
  })
})

describe('isValidUtc', () => {
  it('accepts valid UTC values', () => {
    expect(isValidUtc('+8')).toBeTruthy()
    expect(isValidUtc('+14')).toBeTruthy()
    expect(isValidUtc('+0')).toBeTruthy()
    expect(isValidUtc('-0')).toBeTruthy()
    expect(isValidUtc('+08:00')).toBeTruthy()
    expect(isValidUtc('+04:30')).toBeTruthy()
  })

  it('rejects invalid UTC values', () => {
    expect(isValidUtc('+69')).toBeFalsy()
    expect(isValidUtc('-420')).toBeFalsy()
    expect(isValidUtc('+35')).toBeFalsy()
    expect(isValidUtc('+99:99')).toBeFalsy()
    expect(isValidUtc('beef')).toBeFalsy()
  })
})

import { DateTime } from 'luxon'
import { WeeklySchedule } from 'src/services/specialized-devices/switch/switch-module-service.abstract'
import {
  computeDailyState,
  computeHourlyState,
  computeWeeklyState,
} from './switch-schedule.util'

describe('computeHourlyState', () => {
  it('returns null nothing matches', () => {
    expect(
      computeHourlyState({
        utcOffset: 'UTC+8',
        hourlySchedule: [],
      }),
    ).toEqual(null)

    expect(
      computeHourlyState(
        {
          utcOffset: 'UTC+8',
          hourlySchedule: [
            {
              start: 0,
              end: 15,
              state: 'OFF',
            },
          ],
        },
        DateTime.fromISO('2022-01-01T00:30:00+0800'),
      ),
    ).toEqual(null)
  })

  it('returns the correct state if a match was found', () => {
    const state = computeHourlyState(
      {
        utcOffset: 'UTC+8',
        hourlySchedule: [
          {
            start: 0,
            end: 21,
            state: 'OFF',
          },
          {
            start: 22,
            end: 30,
            state: 'ON',
          },
          {
            start: 31,
            end: 59,
            state: 'OFF',
          },
        ],
      },
      DateTime.fromISO('2022-01-01T12:25:36.000+0800'),
    )

    expect(state).toEqual('ON')
  })
})

describe('computeDailyState', () => {
  it('returns the default state if nothing matches', () => {
    expect(
      computeDailyState({
        utcOffset: 'UTC+8',
        dailySchedule: [],
      }),
    ).toEqual(null)

    expect(
      computeDailyState(
        {
          utcOffset: 'UTC+8',
          dailySchedule: [
            {
              start: '05:00:00',
              end: '10:00:00',
              state: 'ON',
            },
          ],
        },
        DateTime.fromISO('2022-01-01T12:00:00+0800'),
      ),
    ).toEqual(null)
  })

  it('returns the correct state if a match was found', () => {
    const helper = (date: DateTime) =>
      computeDailyState(
        {
          utcOffset: 'UTC+8',
          dailySchedule: [
            {
              start: '00:00:00',
              end: '12:00:00',
              state: 'OFF',
            },
            {
              start: '12:00:01',
              end: '23:59:59',
              state: 'ON',
            },
          ],
        },
        date,
      )

    expect(helper(DateTime.fromISO('2022-01-01T12:00:01+0800'))).toEqual('ON')
    expect(helper(DateTime.fromISO('2022-01-01T09:56:16+0800'))).toEqual('OFF')
  })
})

describe('computeWeeklyState', () => {
  const weeklySchedule: Omit<WeeklySchedule, 'type'> = {
    utcOffset: 'UTC+8',
    weeklySchedule: {
      mon: [],
      tues: [],
      wed: [
        {
          start: '00:00:00',
          end: '12:00:00',
          state: 'OFF',
        },
        {
          start: '12:00:01',
          end: '23:59:59',
          state: 'ON',
        },
      ],
      thurs: [],
      fri: [],
      sat: [],
      sun: [],
    },
  }

  const helper = (date: DateTime) => computeWeeklyState(weeklySchedule, date)

  it('should return the default state if no matching schedule was found', () => {
    // a monday
    expect(helper(DateTime.fromISO('2022-01-03T00:00:25+0800'))).toEqual(null)
  })

  it('should return the correct state if a matching schedule was found', () => {
    // wednesday
    expect(helper(DateTime.fromISO('2022-01-05T13:00:01+0800'))).toEqual('ON')
    expect(helper(DateTime.fromISO('2022-01-05T09:56:16+0800'))).toEqual('OFF')
  })
})

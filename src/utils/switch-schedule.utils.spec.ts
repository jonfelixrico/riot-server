import { DateTime } from 'luxon'
import { computeDailyState, computeHourlyState } from './switch-schedule.util'

describe('computeHourlyState', () => {
  it('returns the default state if nothing matches', () => {
    expect(
      computeHourlyState(
        {
          utcOffset: '+0800',
          hourlySchedule: [],
        },
        'ON',
      ),
    ).toEqual('ON')

    expect(
      computeHourlyState(
        {
          utcOffset: '+0800',
          hourlySchedule: [
            {
              start: 0,
              end: 15,
              state: 'OFF',
            },
          ],
        },
        'ON',
        DateTime.fromISO('2022-01-01T00:30:00+0800'),
      ),
    ).toEqual('ON')
  })

  it('returns the correct state if a match was found', () => {
    const state = computeHourlyState(
      {
        utcOffset: '+0800',
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
      'OFF',
      DateTime.fromISO('2022-01-01T12:25:36.000+0800'),
    )

    expect(state).toEqual('ON')
  })
})

describe('computeDailyState', () => {
  it('returns the default state if nothing matches', () => {
    expect(
      computeDailyState(
        {
          utcOffset: '+0800',
          dailySchedule: [],
        },
        'OFF',
      ),
    ).toEqual('OFF')

    expect(
      computeDailyState(
        {
          utcOffset: '+0800',
          dailySchedule: [
            {
              start: '05:00:00',
              end: '10:00:00',
              state: 'ON',
            },
          ],
        },
        'OFF',
        DateTime.fromISO('2022-01-01T12:00:00+0800'),
      ),
    ).toEqual('OFF')
  })

  it('returns the correct state if a match was found', () => {
    const helper = (date: DateTime) =>
      computeDailyState(
        {
          utcOffset: '+0800',
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
        'OFF',
        date,
      )

    expect(helper(DateTime.fromISO('2022-01-01T13:00:01+0800'))).toEqual('ON')
    expect(helper(DateTime.fromISO('2022-01-01T09:56:16+0800'))).toEqual('OFF')
  })
})

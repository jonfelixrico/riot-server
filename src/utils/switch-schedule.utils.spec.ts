import { DateTime } from 'luxon'
import { computeHourlyState } from './switch-schedule.util'

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

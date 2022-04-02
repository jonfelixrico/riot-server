import { WeeklySchedule } from '@app/services/specialized-devices/switch-manager.interface'
import { DateTime } from 'luxon'
import { computeDailyState, computeWeeklyState } from './switch-schedule.utils'

function hourHelper(timeString: string) {
  const split = timeString.split(':').map(Number)
  const [hour, minute, second] = split
  return {
    hour,
    minute,
    second,
  }
}

describe('computeDailyState', () => {
  it('returns the default state if nothing matches', () => {
    expect(
      computeDailyState({
        utcOffset: '+8',
        dailySchedule: [],
      }),
    ).toEqual(null)

    expect(
      computeDailyState(
        {
          utcOffset: '+8',
          dailySchedule: [
            {
              start: hourHelper('00:00:00'),
              end: hourHelper('10:00:00'),
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
          utcOffset: '+8',
          dailySchedule: [
            {
              start: hourHelper('00:00:00'),
              end: hourHelper('12:00:00'),
              state: 'OFF',
            },
            {
              start: hourHelper('12:00:01'),
              end: hourHelper('23:59:59'),
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
    utcOffset: '+8',
    weeklySchedule: {
      mon: [],
      tues: [],
      wed: [
        {
          start: hourHelper('00:00:00'),
          end: hourHelper('12:00:00'),
          state: 'OFF',
        },
        {
          start: hourHelper('12:00:01'),
          end: hourHelper('23:59:59'),
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

import mongoose from 'mongoose'
import {
  DailySchedule,
  HourlySchedule,
  ScheduleEntry,
  WeeklySchedule,
} from 'src/services/switch-actuator-service.abstract'

interface SwitchInterface
  extends Omit<WeeklySchedule, 'type'>,
    Omit<DailySchedule, 'type'>,
    Omit<HourlySchedule, 'type'> {
  type: 'WEEKLY' | 'HOURLY' | 'DAILY'
}

const ScheduleEntrySchema = new mongoose.Schema<ScheduleEntry>({
  start: String,
  end: String,
  state: {
    type: String,
    enum: ['on', 'off'],
  },
})

export const SwitchSchema = new mongoose.Schema<SwitchInterface>({
  timezoneOffset: Number,
  type: {
    type: String,
    enum: ['DAILY', 'WEEKLY', 'HOURLY'],
  },

  dailySchedule: [ScheduleEntrySchema],

  weeklySchedule: {
    sun: [ScheduleEntrySchema],
    mon: [ScheduleEntrySchema],
    tue: [ScheduleEntrySchema],
    wed: [ScheduleEntrySchema],
    thurs: [ScheduleEntrySchema],
    fri: [ScheduleEntrySchema],
    sat: [ScheduleEntrySchema],
  },

  hourlySchedule: [
    {
      minute: Number,
      state: {
        type: String,
        enum: ['OFF', 'ON'],
      },
    },
  ],
})

import { Schema, Model } from 'mongoose'
import { DeviceModule } from 'src/services/device-service.abstract'
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

const scheduleEntrySchema = new Schema<ScheduleEntry>({
  start: String,
  end: String,
  state: {
    type: String,
    enum: ['on', 'off'],
  },
})

const switchSchema = new Schema<SwitchInterface>({
  timezoneOffset: Number,
  type: {
    type: String,
    enum: ['DAILY', 'WEEKLY', 'HOURLY'],
  },

  dailySchedule: [scheduleEntrySchema],

  weeklySchedule: {
    sun: [scheduleEntrySchema],
    mon: [scheduleEntrySchema],
    tue: [scheduleEntrySchema],
    wed: [scheduleEntrySchema],
    thurs: [scheduleEntrySchema],
    fri: [scheduleEntrySchema],
    sat: [scheduleEntrySchema],
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

export default function (model: Model<DeviceModule>) {
  return model.discriminator('SwitchModule', switchSchema)
}

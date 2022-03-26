import { Schema, Model } from 'mongoose'
import {
  DailySchedule,
  HourlySchedule,
  WeeklySchedule,
} from 'src/services/switch-actuator-service.abstract'
import type { DeviceModule } from './device.mongo-model'

interface SwitchInterface
  extends Omit<WeeklySchedule, 'type'>,
    Omit<DailySchedule, 'type'>,
    Omit<HourlySchedule, 'type'> {
  type: 'WEEKLY' | 'HOURLY' | 'DAILY'
}

const scheduleNestedPath = {
  start: String,
  end: String,
  state: {
    type: String,
    enum: ['on', 'off'],
  },
}

const switchSchema = new Schema<SwitchInterface>({
  timezoneOffset: Number,
  type: {
    type: String,
    enum: ['DAILY', 'WEEKLY', 'HOURLY'],
  },

  dailySchedule: [scheduleNestedPath],

  weeklySchedule: {
    sun: [scheduleNestedPath],
    mon: [scheduleNestedPath],
    tue: [scheduleNestedPath],
    wed: [scheduleNestedPath],
    thurs: [scheduleNestedPath],
    fri: [scheduleNestedPath],
    sat: [scheduleNestedPath],
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

export function switchConfigModelFactory(model: Model<DeviceModule>) {
  return model.discriminator('SwitchConfig', switchSchema)
}

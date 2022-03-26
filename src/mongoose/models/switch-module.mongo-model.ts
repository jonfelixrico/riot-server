import { Schema, Model } from 'mongoose'
import {
  DailySchedule,
  WeeklySchedule,
  HourlySchedule,
} from 'src/services/specialized-devices/switch/switch-module-service.abstract'
import { DeviceModule } from './device.mongo-model'
import { BaseModuleConfig } from './module-config.mongo-model'

export type SwitchConfig = BaseModuleConfig &
  (DailySchedule | WeeklySchedule | HourlySchedule)

const scheduleNestedPath = {
  start: String,
  end: String,
  state: {
    type: String,
    enum: ['on', 'off'],
  },
}

const switchConfigSchema = new Schema<SwitchConfig>({
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
  return model.discriminator('SwitchConfig', switchConfigSchema)
}

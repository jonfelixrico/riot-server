import { Schema, Model } from 'mongoose'
import {
  DailySchedule,
  WeeklySchedule,
  HourlySchedule,
} from 'src/services/specialized-devices/switch/switch-module-service.abstract'
import type { BaseModuleConfig } from './module-config.mongoose-model'

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

/**
 * @param baseConfigModel We'll be attaching the switch config model as a
 * discriminant of this.
 * @returns The model for the switch config.
 */
export function switchConfigModelFactory(
  baseConfigModel: Model<BaseModuleConfig>,
) {
  return baseConfigModel.discriminator('SwitchConfig', switchConfigSchema)
}

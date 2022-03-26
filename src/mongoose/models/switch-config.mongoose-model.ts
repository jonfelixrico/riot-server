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
  start: {
    hour: Number,
    minute: Number,
    second: Number,
  },

  end: {
    hour: Number,
    minute: Number,
    second: Number,
  },

  state: {
    type: String,
    enum: ['ON', 'OFF'],
  },
}

const switchConfigSchema = new Schema<SwitchConfig>({
  utcOffset: Number,

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
      start: {
        minute: Number,
        second: Number,
      },

      end: {
        minute: Number,
        second: Number,
      },

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

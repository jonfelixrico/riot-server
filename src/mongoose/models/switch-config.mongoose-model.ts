import { Schema, Model } from 'mongoose'
import type {
  DailySchedule,
  WeeklySchedule,
  HourlySchedule,
  Override,
} from 'src/services/specialized-devices/switch/switch-module-service.abstract'
import type { MongooseModuleConfig } from './module-config.mongoose-model'

export type SwitchConfig = MongooseModuleConfig &
  (DailySchedule | WeeklySchedule | HourlySchedule) & {
    override?: Override
  }

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

const overrideSchema = new Schema<Override>({
  overrideUntil: Date,
  state: {
    type: String,
    enum: ['ON', 'OFF'],
  },
})

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

  override: overrideSchema,
})

/**
 * @param baseConfigModel We'll be attaching the switch config model as a
 * discriminant of this.
 * @returns The model for the switch config.
 */
export function switchConfigModelFactory(
  baseConfigModel: Model<MongooseModuleConfig>,
) {
  return baseConfigModel.discriminator('SwitchConfig', switchConfigSchema)
}

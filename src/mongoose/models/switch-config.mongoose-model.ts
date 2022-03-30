import { Schema, Model } from 'mongoose'
import type {
  Override,
  SwitchConfig,
} from '@app/services/specialized-devices/switch-manager.interface'
import type { MongooseModuleConfig } from './module-config.mongoose-model'

export type MongooseSwitchConfig = MongooseModuleConfig & SwitchConfig

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

  state: String,
}

const overrideSchema = new Schema<Override>({
  overrideUntil: Date,
  state: String,
})

const switchConfigSchema = new Schema<MongooseSwitchConfig>({
  schedule: {
    utcOffset: Number,

    /**
     * @see {@link https://mongoosejs.com/docs/schematypes.html#type-key} to see why `type` has to be defined
     * this way.
     */
    type: { type: String },

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
  },

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

import { Schema, Model } from 'mongoose'
import { SwitchModule } from '../model.types'
import { DeviceModule } from './device.mongo-model'

const scheduleNestedPath = {
  start: String,
  end: String,
  state: {
    type: String,
    enum: ['on', 'off'],
  },
}

const switchSchema = new Schema<SwitchModule>({
  config: {
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
  },
})

export function switchConfigModelFactory(model: Model<DeviceModule>) {
  return model.discriminator('SwitchConfig', switchSchema)
}

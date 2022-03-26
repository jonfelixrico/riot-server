import { Model } from 'mongoose'
import { Device } from './device.mongoose-model'
import { SwitchConfig } from './switch-config.mongoose-model'

export type SwitchConfigModel = Model<SwitchConfig>
export type DeviceModel = Model<Device>

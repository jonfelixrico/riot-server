import { Model } from 'mongoose'
import { MongooseDevice } from './device.mongoose-model'
import { MongooseSwitchConfig } from './switch-config.mongoose-model'

/*
 * Note regarding BaseModuleConfig:
 * We're not exporting it as BaseModuleConfigModel here because it's really more of an "internal" thing since all we do is
 * attach discriminants to it.
 */

export type SwitchConfigModel = Model<MongooseSwitchConfig>

export type DeviceModel = Model<MongooseDevice>

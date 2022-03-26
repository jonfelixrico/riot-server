import { Model } from 'mongoose'
import { Device } from './device.mongoose-model'
import { SwitchConfig } from './switch-config.mongoose-model'

/*
 * Note regarding BaseModuleConfig:
 * We're not exporting it as BaseModuleConfigModel here because it's really more of an "internal" thing since all we do is
 * attach discriminants to it.
 */

export type SwitchConfigModel = Model<SwitchConfig>

export type DeviceModel = Model<Device>

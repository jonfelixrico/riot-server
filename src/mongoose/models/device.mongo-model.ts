import { Schema, Connection } from 'mongoose'

export interface Device {
  id: string
  lastHeartbeatDt: Date
  modules: []
}

export interface DeviceModule<T = unknown> {
  id: string
  lastUpdateDt: Date
  type: string
  config: T
}

const moduleSchema = new Schema<DeviceModule>({
  id: String,
  lastUpdateDt: Date,
  type: String,
  config: {
    type: Schema.Types.ObjectId,
    ref: 'ModuleConfig',
  },
})

const deviceSchema = new Schema<Device>({
  id: String,
  lastHeartbeatDt: Date,
  modules: [moduleSchema],
})

export function deviceModelFactory(connection: Connection) {
  return connection.model('Device', deviceSchema)
}

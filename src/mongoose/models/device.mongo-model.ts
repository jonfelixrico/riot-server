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

const deviceSchema = new Schema<Device>({
  id: String,
  lastHeartbeatDt: Date,
  modules: [
    {
      ref: 'Module',
      type: Schema.Types.ObjectId,
    },
  ],
})

export function deviceModelFactory(connection: Connection) {
  return connection.model('DeviceModule', deviceSchema)
}

import { Schema, Connection } from 'mongoose'
import type { DeviceModule } from './device.mongo-model'

const moduleSchema = new Schema<DeviceModule>({
  id: String,
  type: String,
  lastUpdateDt: Date,
})

export default function (conn: Connection) {
  return conn.model('ModuleConfig', moduleSchema)
}

import { Schema, Connection } from 'mongoose'
import { DeviceModule } from 'src/services/device-service.abstract'

const moduleSchema = new Schema<DeviceModule>({
  id: String,
  type: String,
})

export default function (conn: Connection) {
  return conn.model('Module', moduleSchema)
}

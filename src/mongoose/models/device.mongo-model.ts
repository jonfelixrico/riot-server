import { Schema, Connection } from 'mongoose'

const deviceSchema = new Schema({
  id: String,
  lastHeartbeatDt: Date,
  modules: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Module',
    },
  ],
})

export default function (connection: Connection) {
  return connection.model('Device', deviceSchema)
}

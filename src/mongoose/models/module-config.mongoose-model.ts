import { Schema, Connection } from 'mongoose'

export interface BaseModuleConfig {
  lastUpdateDt: Date
}

const moduleSchema = new Schema<BaseModuleConfig>({
  lastUpdateDt: Date,
})

export function moduleConfigModelFactory(conn: Connection) {
  return conn.model('ModuleConfig', moduleSchema)
}

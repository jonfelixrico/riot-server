import { Schema, Connection } from 'mongoose'

export interface BaseModuleConfig {
  lastUpdateDt: Date
}

const moduleSchema = new Schema<BaseModuleConfig>({
  lastUpdateDt: Date,
})

/**
 * @param mongooseConnection
 * @returns The model produced here is just meant to act as the base for
 * other module types. For other types, use this model as the discrminator.
 */
export function moduleConfigModelFactory(mongooseConnection: Connection) {
  return mongooseConnection.model('ModuleConfig', moduleSchema)
}

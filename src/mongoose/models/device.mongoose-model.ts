import { Schema, Connection } from 'mongoose'

export interface Device {
  id: string
  lastHeartbeatDt: Date
  modules: DeviceModule[]
}

export interface DeviceModule {
  id: string
  type: string

  /**
   * ObjectId of the ModuleConfig object. We're using a ref here since
   * we're leveraging discriminators.
   */
  config: string
}

const deviceSchema = new Schema<Device>({
  id: String,
  lastHeartbeatDt: Date,
  modules: [
    {
      id: String,
      type: String,

      /*
       * We don't want to make the ref the entire Module instead of just the config out of concerns regarding performance if we want
       * to fetch the config of a module.
       *
       * If we go with a whole-module ref, we will have to:
       * 1. Fetch the device record
       * 2. Hydrate ALL modules <-- the concern
       * 3. Get the appriate module
       *
       * With this approach that we have now, we will have to do:
       * 1. Fetch the device record
       * 2. Find the matching module id in the `modules` array
       * 3. Hydrate the particular record for that single module
       */
      config: {
        type: Schema.Types.ObjectId,
        ref: 'ModuleConfig',
      },
    },
  ],
})

/**
 * @param mongooseConnection
 * @returns The model that describes a device and its module.
 */
export function deviceModelFactory(mongooseConnection: Connection) {
  return mongooseConnection.model('Device', deviceSchema)
}

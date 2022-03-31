import { Schema, Connection, Types } from 'mongoose'

export interface MongooseDevice {
  id: string
  lastHeartbeatDt: Date
  modules: MongooseDeviceModule[]
  firmwareVersion: string
}

interface MongooseDeviceModule {
  id: string
  type: string

  /**
   * ObjectId of the ModuleConfig object. We're using a ref here since
   * we're leveraging discriminators.
   */
  config: Types.ObjectId
}

const deviceSchema = new Schema<MongooseDevice>({
  id: {
    type: String,
    required: true,
  },

  firmwareVersion: {
    type: String,
    required: true,
  },

  lastHeartbeatDt: Date,

  modules: [
    {
      id: {
        type: String,
        required: true,
      },
      /**
       * @see {@link https://mongoosejs.com/docs/schematypes.html#type-key} to see why `type` has to be defined
       * this way.
       */
      type: { type: String, required: true },

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

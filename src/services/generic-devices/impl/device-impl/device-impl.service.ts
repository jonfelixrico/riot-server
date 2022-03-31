import { forwardRef, Inject, Injectable } from '@nestjs/common'
import { DEVICE_MODEL } from '@app/mongoose/mongoose.di-tokens'
import {
  Device,
  DeviceManager,
  DeviceModule,
} from '../../device-manager.interface'
import { Model } from 'mongoose'
import { MongooseDevice } from '@app/mongoose/models/device.mongoose-model'
import { DeviceQuery } from '@app/types/query-common.types'
import {
  DeviceRegistrationQueue,
  DEVICE_REGISTRATION_QUEUE,
} from '../../device-registration-queue.interface'

interface DeviceToRegister extends DeviceQuery {
  modules: DeviceModule[]
}

@Injectable()
export class DeviceImplService implements DeviceManager {
  constructor(
    @Inject(forwardRef(() => DEVICE_REGISTRATION_QUEUE))
    private regSvc: DeviceRegistrationQueue,
    @Inject(DEVICE_MODEL) private deviceModel: Model<MongooseDevice>,
  ) {}

  private async fetch({ deviceId, firmwareVersion }: DeviceQuery) {
    return await this.deviceModel.findOne({ deviceId, firmwareVersion }).exec()
  }

  async bumpHeartbeat(input: DeviceQuery): Promise<void> {
    const device = await this.fetch(input)
    if (!device) {
      throw new Error('device not found')
    }

    // TODO create date provider
    device.lastHeartbeatDt = new Date()
    await device.save()
  }

  async getDevice(input: DeviceQuery): Promise<Device> {
    return await this.fetch(input)
  }

  async doesDeviceExist({
    deviceId,
    firmwareVersion,
  }: DeviceQuery): Promise<boolean> {
    return !!(await this.deviceModel.exists({ deviceId, firmwareVersion }))
  }

  async registerDevice(input: DeviceToRegister) {
    if (await this.doesDeviceExist(input)) {
      throw new Error('device is already registered')
    }

    const queued = await this.regSvc.getQueueItem(input)
    if (!queued) {
      throw new Error('queued item is not found')
    }

    await this.deviceModel.create(input)
  }

  async getDevices(): Promise<Device[]> {
    return await this.deviceModel.find().exec()
  }
}

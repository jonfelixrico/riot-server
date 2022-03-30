import { forwardRef, Inject, Injectable } from '@nestjs/common'
import { DEVICE_MODEL } from 'src/mongoose/mongoose.di-tokens'
import { DeviceRegistrationQueueService } from '../../device-registration-queue-service.abstract'
import {
  Device,
  DeviceManager,
  DeviceModule,
} from '../../device-manager.interface'
import { Model } from 'mongoose'
import { MongooseDevice } from 'src/mongoose/models/device.mongoose-model'
import { DeviceQuery } from 'src/types/query-common.types'

interface DeviceToRegister extends DeviceQuery {
  modules: DeviceModule[]
}

@Injectable()
export class DeviceImplService implements DeviceManager {
  constructor(
    @Inject(forwardRef(() => DeviceRegistrationQueueService))
    private regSvc: DeviceRegistrationQueueService,
    @Inject(DEVICE_MODEL) private deviceModel: Model<MongooseDevice>,
  ) {}

  private async fetch({ deviceId, firmwareVersion }: DeviceQuery) {
    return await this.deviceModel.findOne({ id: deviceId, firmwareVersion })
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
    return !!(await this.deviceModel.exists({ id: deviceId, firmwareVersion }))
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

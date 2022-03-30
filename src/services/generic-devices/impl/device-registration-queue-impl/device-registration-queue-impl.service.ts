import { forwardRef, Inject, Injectable } from '@nestjs/common'
import { sortBy } from 'lodash'
import {
  DeviceQuery,
  DeviceRegistrationQueueService,
  DeviceToQueue,
  QueuedDevice,
} from '../../device-registration-queue-service.abstract'
import { DeviceManager, DEVICE_MANAGER } from '../../device-manager.interface'

const convertToKey = ({
  firmwareVersion,
  deviceId,
}: {
  firmwareVersion: string
  deviceId: string
}) => `${deviceId}/${firmwareVersion}`

@Injectable()
export class DeviceRegistrationQueueImplService extends DeviceRegistrationQueueService {
  private inQueue: Record<string, QueuedDevice> = {}

  constructor(
    @Inject(forwardRef(() => DEVICE_MANAGER)) private deviceSvc: DeviceManager,
  ) {
    super()
  }

  async getQueueItem(input: DeviceQuery): Promise<QueuedDevice> {
    return Promise.resolve(this.inQueue[convertToKey(input)])
  }

  async flagForQueue(input: DeviceToQueue): Promise<void> {
    if (await this.deviceSvc.doesDeviceExist(input)) {
      throw new Error('already registered')
    }

    this.inQueue[convertToKey(input)] = {
      ...input,
      lastQueueDt: new Date(),
    }
  }

  removeFromQueue(input: DeviceQuery): Promise<void> {
    delete this.inQueue[convertToKey(input)]
    return Promise.resolve()
  }

  getQueueItems(): Promise<QueuedDevice[]> {
    const values = Object.values(this.inQueue)
    return Promise.resolve(sortBy(values, ['deviceId', 'version']))
  }
}

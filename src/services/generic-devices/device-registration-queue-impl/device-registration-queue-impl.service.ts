import { forwardRef, Inject, Injectable } from '@nestjs/common'
import { sortBy } from 'lodash'
import {
  DeviceQuery,
  DeviceRegistrationQueueService,
  DeviceToQueue,
  QueuedDevice,
} from '../device-registration-queue-service.abstract'
import { DeviceService } from '../device-service.abstract'

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
    @Inject(forwardRef(() => DeviceService)) private deviceSvc: DeviceService,
  ) {
    super()
  }

  async getQueueItem(input: DeviceQuery): Promise<QueuedDevice> {
    return this.inQueue[convertToKey(input)]
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

  async removeFromQueue(input: DeviceQuery): Promise<void> {
    delete this.inQueue[convertToKey(input)]
  }

  async getQueueItems(): Promise<QueuedDevice[]> {
    const values = Object.values(this.inQueue)
    return sortBy(values, ['deviceId', 'version'])
  }
}

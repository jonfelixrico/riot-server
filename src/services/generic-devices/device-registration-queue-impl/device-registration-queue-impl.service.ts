import { Injectable } from '@nestjs/common'
import {
  DeviceQuery,
  DeviceRegistrationQueueService,
  DeviceToQueue,
  QueuedDevice,
} from '../device-registration-queue-service.abstract'

@Injectable()
export class DeviceRegistrationQueueImplService extends DeviceRegistrationQueueService {
  getQueueItem(input: DeviceQuery): Promise<QueuedDevice> {
    throw new Error('Method not implemented.')
  }
  flagForQueue(input: DeviceToQueue): Promise<void> {
    throw new Error('Method not implemented.')
  }
  removeFromQueue(input: DeviceQuery): Promise<void> {
    throw new Error('Method not implemented.')
  }
  getQueueItems(): Promise<QueuedDevice[]> {
    throw new Error('Method not implemented.')
  }
}

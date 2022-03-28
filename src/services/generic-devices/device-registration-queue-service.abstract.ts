import { DeviceModule } from './device-service.abstract'

export interface DeviceQuery {
  deviceId: string
  firmwareVersion: string
}

export interface DeviceToQueue extends DeviceQuery {
  modules: DeviceModule[]
}

export interface QueuedDevice extends DeviceToQueue {
  lastQueueDt: Date
}

export abstract class DeviceRegistrationQueueService {
  abstract flagForQueue(input: DeviceToQueue): Promise<void>

  abstract removeFromQueue(input: DeviceQuery): Promise<void>

  abstract getQueueItems(): Promise<QueuedDevice[]>

  abstract getQueueItem(input: DeviceQuery): Promise<QueuedDevice>
}

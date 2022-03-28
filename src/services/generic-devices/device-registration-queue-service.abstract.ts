import { DeviceModule } from './device-service.abstract'

interface DeviceQuery {
  deviceId: string
  firmwareVersion: string
}

interface DeviceToQueue extends DeviceQuery {
  modules: DeviceModule[]
}

interface QueuedDevice extends DeviceToQueue {
  lastQueueDt: Date
}

export abstract class DeviceRegistrationQueueService {
  abstract flagForQueue(input: DeviceToQueue): Promise<void>

  abstract removeFromQueue(input: DeviceQuery): Promise<void>

  abstract getQueueItems(): Promise<QueuedDevice[]>
}

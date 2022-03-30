import { DeviceModule } from './device-manager.interface'

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

export abstract class DeviceRegistrationQueueService
  implements DeviceRegistrationQueue
{
  abstract flagForQueue(input: DeviceToQueue): Promise<void>

  abstract removeFromQueue(input: DeviceQuery): Promise<void>

  abstract getQueueItems(): Promise<QueuedDevice[]>

  abstract getQueueItem(input: DeviceQuery): Promise<QueuedDevice>
}

/**
 * Dependency injection token for {@link DeviceRegistrationQueue}.
 */
export const DeviceRegistrationQueue = Symbol('registration queue')

export interface DeviceRegistrationQueue {
  flagForQueue(input: DeviceToQueue): Promise<void>

  removeFromQueue(input: DeviceQuery): Promise<void>

  getQueueItems(): Promise<QueuedDevice[]>

  getQueueItem(input: DeviceQuery): Promise<QueuedDevice>
}

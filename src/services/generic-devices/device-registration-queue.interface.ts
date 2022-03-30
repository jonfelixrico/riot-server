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

/**
 * Dependency injection token for {@link DEVICE_REGISTRATION_QUEUE}.
 */
export const DEVICE_REGISTRATION_QUEUE = Symbol('registration queue')

export interface DeviceRegistrationQueue {
  flagForQueue(input: DeviceToQueue): Promise<void>

  removeFromQueue(input: DeviceQuery): Promise<void>

  getQueueItems(): Promise<QueuedDevice[]>

  getQueueItem(input: DeviceQuery): Promise<QueuedDevice>
}

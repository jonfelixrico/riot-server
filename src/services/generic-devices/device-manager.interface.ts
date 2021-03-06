import { DeviceQuery } from '@app/types/query-common.types'

export interface DeviceModule {
  moduleId: string
  type: string
}

export interface Device {
  modules: DeviceModule[]
  firmwareVersion: string
  deviceId: string
  lastHeartbeatDt: Date
}

export interface DeviceHeartbeat {
  deviceId: string
  lastHeartbeatDt: Date
}

/**
 * Dependency injection token for DeviceManager.
 */
export const DEVICE_MANAGER = Symbol('device manager')

export interface DeviceManager {
  /**
   * Bumps the heartbeat of a device. Hearbeats indicate the last activity received from a device.
   */
  bumpHeartbeat(query: DeviceQuery): Promise<void>

  getDevice(query: DeviceQuery): Promise<Device | null>

  /**
   * Determines if a device exists or not. When checking for exsitence, the use of this should be preferred'
   * over null-checking `getDevice`.
   *
   * @param input
   * @returns True if the device is registered, false if otherwise.
   */
  doesDeviceExist(query: DeviceQuery): Promise<boolean>

  registerDevice(input: {
    deviceId: string
    firmwareVersion: string
    modules: DeviceModule[]
  })

  getDevices(): Promise<Device[]>

  getHeartbeats(): Promise<DeviceHeartbeat[]>
}

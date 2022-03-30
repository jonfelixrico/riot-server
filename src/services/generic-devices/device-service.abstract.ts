import { DeviceQuery } from 'src/types/query-common.types'

export interface DeviceModule {
  id: string
  type: string
}

export interface Device {
  modules: DeviceModule[]
  firmwareVersion: string
  id: string
  lastHeartbeatDt: Date
}

export abstract class DeviceService {
  /**
   * Bumps the heartbeat of a device. Hearbeats indicate the last activity received from a device.
   */
  abstract bumpHeartbeat(query: DeviceQuery): Promise<void>

  abstract getDevice(query: DeviceQuery): Promise<Device | null>

  /**
   * Determines if a device exists or not. When checking for exsitence, the use of this should be preferred'
   * over null-checking `getDevice`.
   *
   * @param input
   * @returns True if the device is registered, false if otherwise.
   */
  abstract doesDeviceExist(query: DeviceQuery): Promise<boolean>

  abstract registerDevice(input: {
    deviceId: string
    firmwareVersion: string
    modules: DeviceModule[]
  })

  abstract getDevices(): Promise<Device[]>
}

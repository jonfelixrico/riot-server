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
   * @param deviceId The id of the device to bump the heartbeat of.
   */
  abstract bumpHeartbeat(input: {
    deviceId: string
    firmwareVersion: string
  }): Promise<void>

  abstract getDevice(input: {
    deviceId: string
    firmwareVersion: string
  }): Promise<Device | null>

  /**
   * Determines if a device exists or not. When checking for exsitence, the use of this should be preferred'
   * over null-checking `getDevice`.
   *
   * @param input
   * @returns True if the device is registered, false if otherwise.
   */
  abstract doesDeviceExist(input: {
    deviceId: string
    firmwareVersion: string
  }): Promise<boolean>

  abstract registerDevice(input: {
    deviceId: string
    firmwareVersion: string
    modules: DeviceModule[]
  })

  abstract getDevices(): Promise<Device[]>
}

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
  }): Promise<Device>

  abstract getDevices(): Promise<Device[]>
}

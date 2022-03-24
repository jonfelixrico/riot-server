export interface DeviceModule {
  id: string
  type: string
}

export interface DeviceToRegister {
  modules: DeviceModule[]
  firmwareVersion: string
  id: string
}

export abstract class DeviceService {
  /**
   * Sets up a device by registering its information with the server.
   *
   * @param device Data containing information about the device.
   * @param registrationToken The token associated with the setup token. This dictates the validity
   * of the setup.
   */
  abstract registerDevice(
    device: DeviceToRegister,
    registrationToken: string,
  ): Promise<void>

  /**
   * Check the validity of the setup of a device. A failing token check means that the device needs
   * to be set up again.
   *
   * @param deviceId
   * @param token
   */
  abstract isDeviceRegistered(deviceId: string, token: string): Promise<boolean>

  /**
   * Bumps the heartbeat of a device. Hearbeats indicate the last activity received from a device.
   * @param deviceId The id of the device to bump the heartbeat of.
   */
  abstract bumpHeartbeat(deviceId: string): Promise<void>
}

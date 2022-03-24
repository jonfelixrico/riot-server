interface DeviceToSetUp {
  modules: {
    id: string
    type: string
  }[]

  firmwareVersion: string
  id: string
}

export abstract class DeviceService {
  /**
   * Sets up a device by registering its information with the server.
   *
   * @param device Data containing information about the device.
   * @param setupToken The token associated with the setup token. This dictates the validity
   * of the setup.
   */
  abstract setupDevice(device: DeviceToSetUp, setupToken: string): Promise<void>

  /**
   * Check the validity of the setup of a device. A failing token check means that the device needs
   * to be set up again.
   *
   * @param deviceId
   * @param token
   */
  abstract checkIfDeviceHasBeenSetUp(
    deviceId: string,
    token: string,
  ): Promise<boolean>
}

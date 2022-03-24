export interface ActuatorState {
  type: string
  id: string
  state: unknown
}

export abstract class ActuatorService {
  /**
   * Fetches the states of the actuators in the device.
   * @param deviceId
   * @returns An array containing the states of all actuators in the device.
   */
  abstract getStates(deviceId: string): Promise<ActuatorState[]>
}

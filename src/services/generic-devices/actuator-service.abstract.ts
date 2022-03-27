/**
 * Represents the state of an actuator.
 */
export interface ActuatorState<T = unknown> {
  type: string
  id: string
  state: T
}

export abstract class ActuatorService {
  /**
   * Fetches the states of the actuators in the device.
   * @param deviceId
   * @returns
   */
  abstract getStates(deviceId: string): Promise<ActuatorState[]>

  /**
   * Fetches the state of an actuator.
   * @param deviceId
   * @param moduleId
   */
  abstract getState<T = unknown>(
    deviceId: string,
    moduleId: string,
  ): Promise<ActuatorState<T>>
}

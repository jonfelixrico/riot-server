export interface SensorReading {
  id: string
  value: unknown
  timestamp?: Date
}

export abstract class SensorService {
  /**
   * Upload the readings of sensors in a device.
   *
   * @param deviceId The device which owns the sensors.
   * @param readings An array containing sensor information and their readings.
   */
  abstract pushReadings(
    deviceId: string,
    readings: SensorReading[],
  ): Promise<void>
}

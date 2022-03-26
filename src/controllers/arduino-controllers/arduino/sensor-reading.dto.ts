import { SensorReading } from 'src/services/generic-devices/sensor-service.abstract'

export class SensorReadingDto implements SensorReading {
  id: string
  value: unknown
  timestamp?: Date
}

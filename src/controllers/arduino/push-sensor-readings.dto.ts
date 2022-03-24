interface DeviceModuleReadings {
  id: string
  type: string
  value: unknown
  timestamp?: Date
}

export class PushSensorReadingsDto {
  modules: DeviceModuleReadings[]
}

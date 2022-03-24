interface DeviceModuleReadings {
  id: string
  type: string
  readings: unknown
}

export class PushSensorReadingsDto {
  modules: DeviceModuleReadings[]
}

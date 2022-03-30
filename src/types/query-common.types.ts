export interface DeviceQuery {
  deviceId: string
  firmwareVersion: string
}

export interface ModuleQuery extends DeviceQuery {
  moduleId: string
}

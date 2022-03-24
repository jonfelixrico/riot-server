interface DeviceModule {
  type: string
  id: string
}

export class RegisterDeviceDto {
  modules: DeviceModule[]
  firmwareVersion: string
}

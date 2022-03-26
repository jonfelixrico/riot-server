import {
  DeviceModule,
  DeviceToRegister,
} from 'src/services/generic-device/device-service.abstract'

export class RegisterDeviceDto implements DeviceToRegister {
  modules: DeviceModule[]
  firmwareVersion: string
  id: string
}

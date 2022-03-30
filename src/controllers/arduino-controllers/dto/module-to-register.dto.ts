import { DeviceModule } from 'src/services/generic-devices/device-manager.interface'

export class ModuleToRegisterDto implements DeviceModule {
  id: string
  type: string
}

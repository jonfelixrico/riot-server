import { DeviceModule } from 'src/services/generic-devices/device-service.abstract'

export class ModuleToRegisterDto implements DeviceModule {
  id: string
  type: string
}

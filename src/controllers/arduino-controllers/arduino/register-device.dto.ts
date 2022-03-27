import { DeviceToRegister } from 'src/services/generic-devices/device-registration-service.abstract'
import { DeviceModule } from 'src/services/generic-devices/device-service.abstract'

export class RegisterDeviceDto
  implements Omit<DeviceToRegister, 'firmwareVersion'>
{
  modules: DeviceModule[]
  id: string
}

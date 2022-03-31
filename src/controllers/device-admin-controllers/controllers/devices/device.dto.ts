import { DeviceModuleDto } from '@app/controllers/dto/device-module.dto'
import { Device } from '@app/services/generic-devices/device-manager.interface'

export class DeviceDto implements Device {
  modules: DeviceModuleDto[]
  firmwareVersion: string
  deviceId: string
  lastHeartbeatDt: Date
}

import { DeviceHeartbeat } from '@app/services/generic-devices/device-manager.interface'

export class DeviceHeartbeatDto implements DeviceHeartbeat {
  deviceId: string
  lastHeartbeatDt: Date
}

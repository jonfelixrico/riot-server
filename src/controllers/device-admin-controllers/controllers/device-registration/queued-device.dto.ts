import { DeviceModuleDto } from '@app/controllers/dto/device-module.dto'
import { QueuedDevice } from '@app/services/generic-devices/device-registration-queue.interface'
export class QueuedDeviceDto implements QueuedDevice {
  lastQueueDt: Date
  modules: DeviceModuleDto[]
  deviceId: string
  firmwareVersion: string
}

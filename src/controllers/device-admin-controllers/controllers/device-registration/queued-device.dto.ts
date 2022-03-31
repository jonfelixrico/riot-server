import { DeviceModuleDto } from '@app/controllers/dto/device-module.dto'
import { QueuedDevice } from '@app/services/generic-devices/device-registration-queue.interface'
import { ApiProperty } from '@nestjs/swagger'

export class QueuedDeviceDto implements QueuedDevice {
  @ApiProperty()
  lastQueueDt: Date

  @ApiProperty({
    type: [DeviceModuleDto],
  })
  modules: DeviceModuleDto[]

  @ApiProperty()
  deviceId: string

  @ApiProperty()
  firmwareVersion: string
}

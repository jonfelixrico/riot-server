import { DeviceModule } from '@app/services/generic-devices/device-manager.interface'
import { QueuedDevice } from '@app/services/generic-devices/device-registration-queue.interface'
import { ApiProperty } from '@nestjs/swagger'

export class QueuedDeviceModuleDto implements DeviceModule {
  @ApiProperty()
  moduleId: string

  @ApiProperty({
    enum: ['SWITCH'],
  })
  type: string
}

export class QueuedDeviceDto implements QueuedDevice {
  @ApiProperty()
  lastQueueDt: Date

  @ApiProperty({
    type: [QueuedDeviceModuleDto],
  })
  modules: DeviceModule[]

  @ApiProperty()
  deviceId: string

  @ApiProperty()
  firmwareVersion: string
}

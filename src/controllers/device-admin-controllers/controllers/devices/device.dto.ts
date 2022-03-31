import { DeviceModuleDto } from '@app/controllers/dto/device-module.dto'
import { Device } from '@app/services/generic-devices/device-manager.interface'
import { ApiProperty } from '@nestjs/swagger'

export class DeviceDto implements Device {
  @ApiProperty({
    type: [DeviceModuleDto],
  })
  modules: DeviceModuleDto[]

  @ApiProperty()
  firmwareVersion: string

  @ApiProperty()
  deviceId: string

  @ApiProperty()
  lastHeartbeatDt: Date
}

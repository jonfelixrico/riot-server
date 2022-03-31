import { DeviceModule } from '@app/services/generic-devices/device-manager.interface'
import { ApiProperty } from '@nestjs/swagger'

export class DeviceModuleDto implements DeviceModule {
  moduleId: string

  @ApiProperty({
    enum: ['SWITCH'],
  })
  type: string
}

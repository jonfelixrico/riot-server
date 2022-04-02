import { DeviceModule } from '@app/services/generic-devices/device-manager.interface'
import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class DeviceModuleDto implements DeviceModule {
  @IsNotEmpty()
  moduleId: string

  @ApiProperty({
    enum: ['SWITCH'],
  })
  @IsNotEmpty()
  type: string
}

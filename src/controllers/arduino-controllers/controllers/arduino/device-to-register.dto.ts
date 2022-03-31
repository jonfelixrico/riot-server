import { DeviceModule } from '@app/services/generic-devices/device-manager.interface'
import { ApiProperty } from '@nestjs/swagger'

export class DeviceToRegisterDto implements DeviceModule {
  moduleId: string

  @ApiProperty({
    description: 'Indicates which kind of a module is associated with the id.',
    enum: ['SWITCH'],
  })
  type: string
}

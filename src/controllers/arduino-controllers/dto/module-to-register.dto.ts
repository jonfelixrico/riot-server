import { DeviceModule } from '@app/services/generic-devices/device-manager.interface'
import { ApiProperty } from '@nestjs/swagger'

export class ModuleToRegisterDto implements DeviceModule {
  @ApiProperty({
    description:
      'The id of the module to be registered. This is namespaced within the device id. You define this.',
    required: true,
  })
  moduleId: string

  @ApiProperty({
    description: 'Indicates which kind of a module is associated with the id.',
    enum: ['SWITCH'],
  })
  type: string
}

import { ApiProperty } from '@nestjs/swagger'

export class HeartbeatRequestDto {
  @ApiProperty({
    description:
      'An object where the key is the id of the sensor-capable module and the value is the representation of their readings.',
    required: false,
  })
  readings?: Record<string, unknown>
}

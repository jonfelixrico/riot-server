import { ApiProperty } from '@nestjs/swagger'

export interface IHeartbeatResponseDto {
  states: Record<string, unknown>
}

export class HeartbeatResponseDto implements IHeartbeatResponseDto {
  @ApiProperty({
    description:
      'An object where the keys are the id of the modules in the device and the value represents their current state. ',
  })
  states: Record<string, unknown>
}

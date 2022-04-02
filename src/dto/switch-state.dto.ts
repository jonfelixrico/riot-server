import { SwitchState } from '@app/services/specialized-devices/switch-manager.interface'
import { SwitchStateEnum } from '@app/types/switch-state.enum'
import { IsEnum } from 'class-validator'

export interface ISwitchStateDto {
  state: SwitchState
}

export class SwitchStateDto implements ISwitchStateDto {
  @IsEnum(SwitchStateEnum)
  state: SwitchStateEnum
}

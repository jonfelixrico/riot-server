import { SwitchState } from '@app/services/specialized-devices/switch-manager.interface'

export interface ISwitchStateDto {
  state: SwitchState
}

export class SwitchStateDto implements ISwitchStateDto {
  state: SwitchState
}

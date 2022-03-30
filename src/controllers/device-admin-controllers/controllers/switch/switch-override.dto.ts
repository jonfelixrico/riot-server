import {
  Override,
  SwitchState,
} from '@app/services/specialized-devices/switch-manager.interface'

export class SwitchOverrideDto implements Override {
  state: SwitchState
  overrideUntil?: Date
}

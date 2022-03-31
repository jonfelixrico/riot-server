import {
  Override,
  SwitchState,
} from '@app/services/specialized-devices/switch-manager.interface'

export class SwitchOverrideDto implements Override {
  // TODO use an enum for this
  state: SwitchState
  overrideUntil?: Date
}

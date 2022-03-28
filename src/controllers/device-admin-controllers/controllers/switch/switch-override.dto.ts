import {
  Override,
  SwitchState,
} from 'src/services/specialized-devices/switch/switch-module-service.abstract'

export class SwitchOverrideDto implements Override {
  state: SwitchState
  overrideUntil?: Date
}

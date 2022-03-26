import {
  Override,
  SwitchState,
} from 'src/services/switch-module-service.abstract'

export class SwitchOverrideDto implements Override {
  state: SwitchState
  overrideUntil?: Date
}

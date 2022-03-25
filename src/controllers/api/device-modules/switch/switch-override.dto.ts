import {
  Override,
  SwitchState,
} from 'src/services/switch-actuator-service.abstract'

export class SwitchOverrideDto implements Override {
  state: SwitchState
  overrideUntil?: Date
}

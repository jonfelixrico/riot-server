import {
  Override,
  SwitchState,
} from '@app/services/specialized-devices/switch-manager.interface'
import { IsDate, IsOptional, IsNotEmpty } from 'class-validator'

export class SwitchOverrideDto implements Override {
  // TODO use an enum for this
  state: SwitchState

  @IsDate()
  @IsOptional()
  overrideUntil?: Date
}

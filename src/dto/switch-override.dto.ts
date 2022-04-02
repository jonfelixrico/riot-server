import { Override } from '@app/services/specialized-devices/switch-manager.interface'
import { SwitchStateEnum } from '@app/types/switch-state.enum'
import { IsDate, IsOptional, IsEnum } from 'class-validator'

export class SwitchOverrideDto implements Override {
  @IsEnum(SwitchStateEnum)
  state: SwitchStateEnum

  @IsDate()
  @IsOptional()
  overrideUntil?: Date
}

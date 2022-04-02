import {
  ScheduleEntry,
  ScheduleTime,
} from '@app/services/specialized-devices/switch-manager.interface'
import { SwitchStateEnum } from '@app/types/switch-state.enum'
import {
  IsInt,
  Min,
  Max,
  IsNotEmpty,
  ValidateNested,
  IsEnum,
} from 'class-validator'

export class ScheduleTimeDto implements ScheduleTime {
  @IsInt()
  @Min(0)
  @Max(59)
  @IsNotEmpty()
  minute: number

  @IsInt()
  @Min(0)
  @Max(23)
  @IsNotEmpty()
  hour: number

  @IsInt()
  @Min(0)
  @Max(59)
  @IsNotEmpty()
  second: number
}

export class ScheduleEntryDto implements ScheduleEntry {
  @IsNotEmpty()
  @ValidateNested()
  start: ScheduleTimeDto

  @IsNotEmpty()
  @ValidateNested()
  end: ScheduleTimeDto

  @IsEnum(SwitchStateEnum)
  state: SwitchStateEnum
}

import {
  IsDate,
  IsNotEmpty,
  IsArray,
  ValidateNested,
  IsString,
} from 'class-validator'
import { DeviceModuleDto } from '@app/dto/device-module.dto'
import { QueuedDevice } from '@app/services/generic-devices/device-registration-queue.interface'

export class QueuedDeviceDto implements QueuedDevice {
  @IsDate()
  @IsNotEmpty()
  lastQueueDt: Date

  @IsArray()
  @ValidateNested()
  modules: DeviceModuleDto[]

  @IsString()
  @IsNotEmpty()
  deviceId: string

  @IsString()
  @IsNotEmpty()
  firmwareVersion: string
}

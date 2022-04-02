import { DeviceModuleDto } from '@app/dto/device-module.dto'
import { Device } from '@app/services/generic-devices/device-manager.interface'
import {
  IsArray,
  ValidateNested,
  IsNotEmpty,
  IsDate,
  IsString,
} from 'class-validator'

export class DeviceDto implements Device {
  @IsArray()
  @ValidateNested()
  modules: DeviceModuleDto[]

  @IsNotEmpty()
  @IsString()
  firmwareVersion: string

  @IsNotEmpty()
  @IsString()
  deviceId: string

  @IsNotEmpty()
  @IsDate()
  lastHeartbeatDt: Date
}

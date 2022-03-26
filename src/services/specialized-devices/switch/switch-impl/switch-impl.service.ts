import { Injectable } from '@nestjs/common'
import {
  DailySchedule,
  HourlySchedule,
  Override,
  SwitchModuleService,
  SwitchState,
  WeeklySchedule,
} from '../switch-module-service.abstract'

@Injectable()
export class SwitchImplService extends SwitchModuleService {
  getState(deviceId: string, moduleId: string): Promise<SwitchState> {
    throw new Error('Method not implemented.')
  }

  setSchedule(
    deviceId: string,
    moduleId: string,
    schedule: DailySchedule | WeeklySchedule | HourlySchedule,
  ): Promise<void> {
    throw new Error('Method not implemented.')
  }

  setOverride(
    deviceId: string,
    moduleId: string,
    override: Override,
  ): Promise<void> {
    throw new Error('Method not implemented.')
  }
}

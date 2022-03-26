import {
  DailySchedule,
  HourlySchedule,
  WeeklySchedule,
} from 'src/services/switch-module-service.abstract'

export interface Device {
  id: string
  lastHeartbeatDt: Date
  modules: []
}

export interface DeviceModule<T = unknown> {
  id: string
  lastUpdateDt: Date
  type: string
  config: T
}

export type SwitchModule = DeviceModule<
  DailySchedule | WeeklySchedule | HourlySchedule
>

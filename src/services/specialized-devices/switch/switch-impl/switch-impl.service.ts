import { Inject, Injectable } from '@nestjs/common'
import {
  DeviceModel,
  SwitchConfigModel,
} from 'src/mongoose/models/mongoose-models.types'
import {
  DEVICE_MODEL,
  SWTICH_CONFIG_MODEL,
} from 'src/mongoose/mongoose.di-tokens'
import {
  computeDailyState,
  computeHourlyState,
  computeWeeklyState,
} from 'src/utils/switch-schedule.utils'
import {
  BaseSchedule,
  DailySchedule,
  HourlySchedule,
  Override,
  SwitchModuleService,
  SwitchState,
  WeeklySchedule,
} from '../switch-module-service.abstract'

function scheduleWiper(
  object: BaseSchedule &
    Pick<DailySchedule, 'dailySchedule'> &
    Pick<WeeklySchedule, 'weeklySchedule'> &
    Pick<HourlySchedule, 'hourlySchedule'>,
): void {
  object.dailySchedule = undefined
  object.hourlySchedule = undefined
  object.dailySchedule = undefined
  object.type = undefined
  object.utcOffset = undefined
}

@Injectable()
export class SwitchImplService extends SwitchModuleService {
  constructor(
    @Inject(DEVICE_MODEL) private devices: DeviceModel,
    @Inject(SWTICH_CONFIG_MODEL) private switchConfigs: SwitchConfigModel,
  ) {
    super()
  }

  private async fetch(deviceId: string, moduleId: string) {
    const device = await this.devices.findOne({
      id: deviceId,
    })

    if (device) {
      return null
    }

    const dModule = device.modules.find(({ id }) => id === moduleId)
    if (!dModule) {
      console.warn(
        'SwitchImplService: device was found but module ref was not found',
      )
      return null
    }

    return await this.switchConfigs.findById(dModule.config)
  }

  async getState(deviceId: string, moduleId: string): Promise<SwitchState> {
    const record = await this.fetch(deviceId, moduleId)
    if (!record) {
      return null
    }

    switch (record.type) {
      case 'DAILY':
        return computeDailyState(record)
      case 'HOURLY':
        return computeHourlyState(record)
      case 'WEEKLY':
        return computeWeeklyState(record)
      default:
        throw new Error('unknown record type')
    }
  }

  async setSchedule(
    deviceId: string,
    moduleId: string,
    schedule: DailySchedule | WeeklySchedule | HourlySchedule,
  ): Promise<void> {
    const record = await this.fetch(deviceId, moduleId)
    if (!record) {
      throw new Error('record not found')
    }

    scheduleWiper(record)
    Object.assign(record, schedule)
    record.lastUpdateDt = new Date()

    await record.save()
  }

  async setOverride(
    deviceId: string,
    moduleId: string,
    override?: Override,
  ): Promise<void> {
    const record = await this.fetch(deviceId, moduleId)
    if (!record) {
      throw new Error('record not found')
    }

    if (!override) {
      record.override = undefined
    } else {
      record.override = override
    }

    record.lastUpdateDt = new Date()
    await record.save()
  }
}

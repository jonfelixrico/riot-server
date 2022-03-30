import { Inject, Injectable } from '@nestjs/common'
import {
  DeviceModel,
  SwitchConfigModel,
} from 'src/mongoose/models/mongoose-models.types'
import {
  DEVICE_MODEL,
  MONGOOSE_CONN,
  SWTICH_CONFIG_MODEL,
} from 'src/mongoose/mongoose.di-tokens'
import {
  computeDailyState,
  computeWeeklyState,
} from 'src/utils/switch-schedule.utils'
import {
  DailySchedule,
  Override,
  SwitchConfig,
  SwitchManager,
  SwitchState,
  WeeklySchedule,
} from '../switch-manager.interface'
import { Connection } from 'mongoose'
import {
  DateTimeProvider,
  DATETIME_PROVIDER,
} from 'src/common-services/time-provider.interface'
import { DateTime } from 'luxon'
import { MongooseSwitchConfig } from 'src/mongoose/models/switch-config.mongoose-model'
import { ModuleQuery } from 'src/types/query-common.types'

const DEFAULT_CONFIG: Omit<MongooseSwitchConfig, 'lastUpdateDt'> = {
  schedule: {
    utcOffset: '+0',
    type: 'DAILY',
    dailySchedule: [
      {
        start: {
          hour: 0,
          minute: 0,
          second: 0,
        },
        end: {
          hour: 23,
          minute: 59,
          second: 59,
        },
        state: 'OFF',
      },
    ],
  },
}

@Injectable()
export class SwitchImplService implements SwitchManager {
  constructor(
    @Inject(DEVICE_MODEL) private devices: DeviceModel,
    @Inject(SWTICH_CONFIG_MODEL) private switchConfigs: SwitchConfigModel,
    @Inject(DATETIME_PROVIDER) private dtProvider: DateTimeProvider,
  ) {}

  private async fetchRecord({
    deviceId,
    moduleId,
    firmwareVersion,
  }: ModuleQuery) {
    const device = await this.devices.findOne(
      {
        id: deviceId,
        firmwareVersion,
      },
      // setting lean since we don't need much from the device model here
      { lean: true },
    )

    if (!device) {
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

  private async computeState(config: SwitchConfig): Promise<SwitchState> {
    const now = await this.dtProvider.getCurrentDateTime()

    const { override } = config
    if (override) {
      if (
        !override.overrideUntil || // unli-override
        now.diff(DateTime.fromJSDate(override.overrideUntil)).milliseconds > 0 // override expiration has not yet lapsed
      ) {
        return override.state
      }
    }

    switch (config.schedule.type) {
      case 'DAILY':
        return computeDailyState(config.schedule, now)
      case 'WEEKLY':
        return computeWeeklyState(config.schedule, now)
      default:
        throw new Error('unknown record type')
    }
  }

  async getState(input): Promise<SwitchState> {
    const record = await this.fetchRecord(input)
    return this.computeState(record ?? DEFAULT_CONFIG)
  }

  async setSchedule(
    input,
    schedule: DailySchedule | WeeklySchedule,
  ): Promise<void> {
    const record = await this.fetchRecord(input)
    if (!record) {
      throw new Error('record not found')
    }

    switch (record.schedule.type) {
      case 'DAILY': {
        record.schedule.dailySchedule = undefined
        break
      }

      case 'WEEKLY': {
        record.schedule.weeklySchedule = undefined
        break
      }
    }

    Object.assign(record, schedule)
    record.lastUpdateDt = new Date()

    await record.save()
  }

  async setOverride(input, override?: Override): Promise<void> {
    const record = await this.fetchRecord(input)
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

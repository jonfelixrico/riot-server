import { Inject, Injectable } from '@nestjs/common'
import {
  DeviceModel,
  SwitchConfigModel,
} from '@app/mongoose/models/mongoose-models.types'
import {
  DEVICE_MODEL,
  MONGOOSE_CONN,
  SWTICH_CONFIG_MODEL,
} from '@app/mongoose/mongoose.di-tokens'
import {
  computeDailyState,
  computeWeeklyState,
} from '@app/utils/switch-schedule.utils'
import {
  DailySchedule,
  Override,
  SwitchConfig,
  SwitchManager,
  SwitchState,
  WeeklySchedule,
} from '../../switch-manager.interface'
import {
  DateTimeProvider,
  DATETIME_PROVIDER,
} from '@app/common-services/time-provider.interface'
import { DateTime } from 'luxon'
import { MongooseSwitchConfig } from '@app/mongoose/models/switch-config.mongoose-model'
import { ModuleQuery } from '@app/types/query-common.types'
import { Connection } from 'mongoose'

function generateDefault(): Omit<MongooseSwitchConfig, 'lastUpdateDt'> {
  return {
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
}

@Injectable()
export class SwitchImplService implements SwitchManager {
  constructor(
    @Inject(DEVICE_MODEL) private devices: DeviceModel,
    @Inject(SWTICH_CONFIG_MODEL) private switchConfigs: SwitchConfigModel,
    @Inject(DATETIME_PROVIDER) private dtProvider: DateTimeProvider,
    @Inject(MONGOOSE_CONN) private conn: Connection,
  ) {}
  private async fetchRecord(
    { moduleId, ...deviceQuery }: ModuleQuery,
    lean?: boolean,
  ) {
    const device = await this.devices.findOne(deviceQuery).lean() // setting lean since we don't need much from the device model here
    if (!device) {
      throw new Error('device not found')
    }

    const dModule = device.modules.find((m) => m.moduleId === moduleId)
    if (!dModule) {
      throw new Error('module not found')
    }

    if (!dModule.config) {
      return null
    }

    const query = this.switchConfigs.findById(dModule.config)
    if (lean) {
      return await query.lean()
    }

    return await query.exec()
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

  private async updateConfig(
    { deviceId, firmwareVersion, moduleId }: ModuleQuery,
    config: Omit<MongooseSwitchConfig, 'lastUpdateDt'>,
  ): Promise<void> {
    const device = await this.devices
      .findOne({
        deviceId,
        firmwareVersion,
      })
      .exec()

    if (!device) {
      throw new Error('device not found')
    }

    const dModule = device.modules.find((m) => m.moduleId === moduleId)
    if (!dModule) {
      throw new Error('moduel not found')
    }

    const savePayload: MongooseSwitchConfig = {
      ...config,
      lastUpdateDt: new Date(),
    }

    if (dModule.config) {
      await this.switchConfigs.findByIdAndUpdate(dModule.config, savePayload)
      return
    }

    const forSaving = new this.switchConfigs(savePayload)
    dModule.config = forSaving._id

    await this.conn.transaction(async () => {
      await device.save()
      await forSaving.save()
    })
  }

  async getConfig(query: ModuleQuery): Promise<SwitchConfig> {
    return (await this.fetchRecord(query, true)) ?? generateDefault()
  }

  async getState(input): Promise<SwitchState> {
    const record = await this.fetchRecord(input)
    return this.computeState(record ?? generateDefault())
  }

  async setSchedule(
    input: ModuleQuery,
    schedule: DailySchedule | WeeklySchedule,
  ): Promise<void> {
    const record = (await this.fetchRecord(input)) ?? generateDefault()
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
    await this.updateConfig(input, record)
  }

  async setOverride(input: ModuleQuery, override?: Override): Promise<void> {
    const record = (await this.fetchRecord(input)) ?? generateDefault()
    if (!record) {
      throw new Error('record not found')
    }

    if (!override) {
      record.override = undefined
    } else {
      record.override = override
    }

    await this.updateConfig(input, record)
  }
}

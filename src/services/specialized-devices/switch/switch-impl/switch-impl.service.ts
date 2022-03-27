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
  computeHourlyState,
  computeWeeklyState,
} from 'src/utils/switch-schedule.utils'
import {
  DailySchedule,
  HourlySchedule,
  Override,
  SwitchModuleService,
  SwitchState,
  WeeklySchedule,
} from '../switch-module-service.abstract'
import { Connection } from 'mongoose'

@Injectable()
export class SwitchImplService extends SwitchModuleService {
  constructor(
    @Inject(DEVICE_MODEL) private devices: DeviceModel,
    @Inject(SWTICH_CONFIG_MODEL) private switchConfigs: SwitchConfigModel,
    @Inject(MONGOOSE_CONN) private conn: Connection,
  ) {
    super()
  }

  private async fetch(deviceId: string, moduleId: string) {
    const device = await this.devices.findOne(
      {
        id: deviceId,
      },
      // setting lean since we don't need much from the device model here
      { lean: true },
    )

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

    switch (record.type) {
      case 'DAILY': {
        record.dailySchedule = undefined
        break
      }

      case 'HOURLY': {
        record.hourlySchedule = undefined
        break
      }

      case 'WEEKLY': {
        record.weeklySchedule = undefined
        break
      }
    }

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

  async initalizeSwitchConfig(deviceId: string, moduleId: string) {
    const initSwitchConfig = new this.switchConfigs({
      type: 'HOURLY',
      hourlySchedule: [],
      utcOffset: '+0',
      lastUpdateDt: new Date(),
    })

    const device = await this.devices.findOne({ id: deviceId })
    if (!device) {
      throw new Error('device not found')
    }

    const dModule = device.modules.find(({ id }) => id === moduleId)
    if (!dModule) {
      throw new Error('device not found')
    }

    dModule.config = initSwitchConfig._id

    await this.conn.transaction(async () => {
      await initSwitchConfig.save()
      await device.save()
    })
  }
}

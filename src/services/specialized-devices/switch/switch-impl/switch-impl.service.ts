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
  DailySchedule,
  HourlySchedule,
  Override,
  SwitchModuleService,
  SwitchState,
  WeeklySchedule,
} from '../switch-module-service.abstract'

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
    const record = this.fetch(deviceId, moduleId)
    if (!record) {
      return null
    }
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

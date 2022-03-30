import { Inject, Injectable } from '@nestjs/common'
import { DEVICE_MODEL } from '@app/mongoose/mongoose.di-tokens'
import { ModuleStateService } from '../../module-state-service.abstract'
import { Model } from 'mongoose'
import { MongooseDevice } from '@app/mongoose/models/device.mongoose-model'
import {
  SwitchManager,
  SWITCH_MANAGER,
} from '@app/services/specialized-devices/switch-manager.interface'

interface DeviceQuery {
  deviceId: string
  firmwareVersion: string
}

interface ModuleQuery extends DeviceQuery {
  moduleId: string
}

@Injectable()
export class ModuleStateImplService extends ModuleStateService {
  constructor(
    @Inject(DEVICE_MODEL) private deviceModel: Model<MongooseDevice>,
    @Inject(SWITCH_MANAGER) private switchSvc: SwitchManager,
  ) {
    super()
  }

  async getState(query: ModuleQuery): Promise<unknown> {
    // TODO add other module types
    return await this.switchSvc.getState(query)
  }

  async getStates(query: DeviceQuery): Promise<Record<string, unknown>> {
    const device = await this.deviceModel.findOne(query, { lean: true })
    if (!device) {
      throw new Error('device not found')
    }

    const states: Record<string, unknown> = {}
    for (const { id } of device.modules) {
      // TODO add other module types
      const state = await this.switchSvc.getState({
        ...query,
        moduleId: id,
      })

      states[id] = state
    }

    return states
  }
}

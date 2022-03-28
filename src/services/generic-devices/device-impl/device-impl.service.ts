import { forwardRef, Inject, Injectable } from '@nestjs/common'
import { DeviceRegistrationQueueService } from '../device-registration-queue-service.abstract'
import { Device, DeviceModule, DeviceService } from '../device-service.abstract'

interface DeviceQuery {
  deviceId: string
  firmwareVersion: string
}

interface DeviceToRegister extends DeviceQuery {
  modules: DeviceModule[]
}

@Injectable()
export class DeviceImplService extends DeviceService {
  constructor(
    @Inject(forwardRef(() => DeviceRegistrationQueueService))
    private regSvc: DeviceRegistrationQueueService,
  ) {
    super()
  }

  async bumpHeartbeat(input: DeviceQuery): Promise<void> {
    if (!(await this.doesDeviceExist(input))) {
      throw new Error('device not found')
    }

    // TODO update db record
  }

  async getDevice(input: DeviceQuery): Promise<Device> {
    // TODO return record
    throw new Error('Method not implemented.')
  }

  async doesDeviceExist(input: DeviceQuery): Promise<boolean> {
    // TODO return record
    throw new Error('Method not implemented.')
  }

  async registerDevice(input: DeviceToRegister) {
    if (await this.doesDeviceExist(input)) {
      throw new Error('device is already registered')
    }

    // TODO do registration
    throw new Error('Method not implemented.')
  }

  getDevices(): Promise<Device[]> {
    // TODO fetch records
    throw new Error('Method not implemented.')
  }
}

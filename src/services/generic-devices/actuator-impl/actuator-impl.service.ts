import { Injectable } from '@nestjs/common'
import { ActuatorService, ActuatorState } from '../actuator-service.abstract'

@Injectable()
export class ActuatorImplService extends ActuatorService {
  getStates(deviceId: string): Promise<ActuatorState<unknown>[]> {
    throw new Error('Method not implemented.')
  }
  getState<T = unknown>(
    deviceId: string,
    moduleId: string,
  ): Promise<ActuatorState<T>> {
    throw new Error('Method not implemented.')
  }
}

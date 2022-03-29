export abstract class ModuleStateService {
  abstract getState(query: {
    moduleId: string
    deviceId: string
    firmwareVersion: string
  }): Promise<unknown>

  abstract getStates(query: {
    deviceId: string
    firmwareVersion: string
  }): Promise<Record<string, unknown>>
}

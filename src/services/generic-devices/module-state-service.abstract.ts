export abstract class ModuleStateService {
  abstract getState<T>(query: {
    moduleId: string
    deviceId: string
    firmwareVersion: string
  }): Promise<T>

  abstract getStates(query: {
    deviceId: string
    firmwareVersion: string
  }): Promise<Record<string, unknown>>
}

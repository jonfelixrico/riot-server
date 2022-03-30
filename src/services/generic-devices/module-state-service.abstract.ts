export abstract class ModuleStateService implements ModuleStateProvider {
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

/**
 * Dependency injection token for {@link ModuleStateProvider}.
 */
export const MODULE_STATE_PROVIDER = Symbol('module state provider')

export abstract class ModuleStateProvider {
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

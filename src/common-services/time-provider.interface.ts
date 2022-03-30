import { DateTime } from 'luxon'

export interface TimeProvider {
  /**
   * Provides the Date at the time of invocation.
   * Timezone follows the system's timezone.
   */
  getCurrentTime(): Promise<DateTime>
}

/**
 * Dependency token for the time provider.
 */
export const TIME_PROVIDER = Symbol('time provider')

import { DateTime } from 'luxon'

export interface DateTimeProvider {
  getCurrentDateTime(): Promise<DateTime>
}

/**
 * Dependency token for the time provider.
 */
export const DATETIME_PROVIDER = Symbol('datetime provider')

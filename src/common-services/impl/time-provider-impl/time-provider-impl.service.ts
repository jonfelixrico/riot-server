import { Injectable } from '@nestjs/common'
import { DateTime } from 'luxon'
import { TimeProvider } from 'src/common-services/time-provider.interface'

@Injectable()
export class TimeProviderImplService implements TimeProvider {
  getCurrentTime(): Promise<DateTime> {
    return Promise.resolve(DateTime.now())
  }
}

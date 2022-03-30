import { Injectable } from '@nestjs/common'
import { DateTime } from 'luxon'
import { DateTimeProvider } from '@app/common-services/time-provider.interface'

@Injectable()
export class DatetimeProviderImplService implements DateTimeProvider {
  getCurrentDateTime(): Promise<DateTime> {
    return Promise.resolve(DateTime.now())
  }
}

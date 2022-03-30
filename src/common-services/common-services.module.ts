import { Module } from '@nestjs/common'
import { DATETIME_PROVIDER } from './time-provider.interface'
import { DatetimeProviderImplService } from './impl/datetime-provider-impl/datetime-provider-impl.service'

@Module({
  providers: [
    DatetimeProviderImplService,
    {
      provide: DATETIME_PROVIDER,
      useExisting: DatetimeProviderImplService,
    },
  ],
})
export class CommonServicesModule {}

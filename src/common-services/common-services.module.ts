import { Module } from '@nestjs/common'
import { DATETIME_PROVIDER } from './time-provider.interface'
import { TimeProviderImplService } from './impl/time-provider-impl/time-provider-impl.service'

@Module({
  providers: [
    {
      provide: DATETIME_PROVIDER,
      useExisting: TimeProviderImplService,
    },
    TimeProviderImplService,
  ],
})
export class CommonServicesModule {}

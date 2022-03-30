import { Module } from '@nestjs/common'
import { TIME_PROVIDER } from './time-provider.interface'
import { TimeProviderImplService } from './impl/time-provider-impl/time-provider-impl.service'

@Module({
  providers: [
    {
      provide: TIME_PROVIDER,
      useExisting: TimeProviderImplService,
    },
    TimeProviderImplService,
  ],
})
export class CommonServicesModule {}

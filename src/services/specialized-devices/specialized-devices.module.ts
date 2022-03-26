import { Module } from '@nestjs/common'
import { SwitchImplService } from './switch/switch-impl/switch-impl.service'

@Module({
  providers: [SwitchImplService],
})
export class SpecializedDevicesModule {}

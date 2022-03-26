import { Module } from '@nestjs/common'
import { ActuatorQueryModule } from '../actuator-query/actuator-query.module'

@Module({
  imports: [ActuatorQueryModule],
})
export class GenericDevicesModule {}

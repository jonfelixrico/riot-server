import { Module } from '@nestjs/common'
import {
  DEVICE_MODEL,
  MODULE_CONFIG_MODEL,
  MONGOOSE_CONN,
  SWTICH_CONFIG_MODEL,
} from './mongoose.di-tokens'
import { deviceModelFactory } from './models/device.mongoose-model'
import { moduleConfigModelFactory } from './models/module-config.mongoose-model'
import { switchConfigModelFactory } from './models/switch-config.mongoose-model'
import { ConfigModule, ConfigService } from '@nestjs/config'
import mongoose from 'mongoose'

@Module({
  providers: [
    {
      provide: MONGOOSE_CONN,
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const uri = config.get<string>('MONGODB_URI')

        if (config.get<string>('NODE_ENV') !== 'production') {
          console.log('MongoDB: using %s', uri)
        }

        return mongoose.connect(uri)
      },
    },
    {
      provide: DEVICE_MODEL,
      inject: [MONGOOSE_CONN],
      useFactory: deviceModelFactory,
    },
    {
      provide: MODULE_CONFIG_MODEL,
      inject: [MONGOOSE_CONN],
      useFactory: moduleConfigModelFactory,
    },
    {
      provide: SWTICH_CONFIG_MODEL,
      inject: [MODULE_CONFIG_MODEL],
      useFactory: switchConfigModelFactory,
    },
  ],

  imports: [ConfigModule.forRoot()],
  exports: [MONGOOSE_CONN, DEVICE_MODEL, SWTICH_CONFIG_MODEL],
})
export class MongooseModule {}

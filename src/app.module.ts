import { Module } from '@nestjs/common'
import { ArduinoController } from './controllers/arduino/arduino.controller'

@Module({
  imports: [],
  controllers: [ArduinoController],
  providers: [],
})
export class AppModule {}

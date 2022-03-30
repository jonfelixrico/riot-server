import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { ArduinoControllersModule } from '@app/controllers/arduino-controllers/arduino-controllers.module'

describe('AppController (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ArduinoControllersModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  test('processEmit', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!')
  })
})

import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from '@app/app.module'
import { DeviceModule } from '@app/services/generic-devices/device-manager.interface'
import { QueuedDevice } from '@app/services/generic-devices/device-registration-queue.interface'
import { v4 } from 'uuid'

describe('registration flow', () => {
  let app: INestApplication

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  const deviceId = v4()
  const version = '1'
  const testDevice: DeviceModule = {
    moduleId: 'switch-1',
    type: 'switch',
  }

  it('should return 404 for unregistered devices', () => {
    return request(app.getHttpServer())
      .put(`/arduino/${deviceId}/version/${version}`)
      .expect(404)
  })

  it('should acccept registration from unregistered devcies', () => {
    return request(app.getHttpServer())
      .post(`/arduino/${deviceId}/version/${version}`)
      .send([testDevice])
      .expect(202)
  })

  it('should be in registration list', async () => {
    const promise: Promise<{ body: QueuedDevice }> = request(
      app.getHttpServer(),
    )
      .get(`/api/device/unregistered/${deviceId}/version/${version}`)
      .expect(200)

    const { body } = await promise

    expect(body.deviceId).toEqual(deviceId)
    expect(body.firmwareVersion).toEqual(version)
    expect(body.modules).toContainEqual(testDevice)
  })

  it('should register sucesssfully', async () => {
    await request(app.getHttpServer())
      .post(`/api/device/unregistered/${deviceId}/version/${version}`)
      .expect(201)
  })

  it('should return 200 since the device has been registered', () => {
    return request(app.getHttpServer())
      .put(`/arduino/${deviceId}/version/${version}`)
      .expect(200)
  })
})

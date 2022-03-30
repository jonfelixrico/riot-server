import { Test, TestingModule } from '@nestjs/testing'
import { DeviceRegistrationController } from './device-registration.controller'

describe('DeviceRegistrationController', () => {
  let controller: DeviceRegistrationController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeviceRegistrationController],
    }).compile()

    controller = module.get<DeviceRegistrationController>(
      DeviceRegistrationController,
    )
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})

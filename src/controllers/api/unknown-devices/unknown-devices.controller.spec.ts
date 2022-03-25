import { Test, TestingModule } from '@nestjs/testing'
import { UnknownDevicesController } from './unknown-devices.controller'

describe('UnknownDevicesController', () => {
  let controller: UnknownDevicesController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UnknownDevicesController],
    }).compile()

    controller = module.get<UnknownDevicesController>(UnknownDevicesController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})

import { Test, TestingModule } from '@nestjs/testing'
import { DeviceImplService } from './device-impl.service'

describe.skip('DeviceImplService', () => {
  let service: DeviceImplService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeviceImplService],
    }).compile()

    service = module.get<DeviceImplService>(DeviceImplService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})

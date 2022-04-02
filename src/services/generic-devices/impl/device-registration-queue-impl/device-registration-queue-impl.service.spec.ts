import { Test, TestingModule } from '@nestjs/testing'
import { DeviceRegistrationQueueImplService } from './device-registration-queue-impl.service'

describe.skip('DeviceRegistrationQueueImplService', () => {
  let service: DeviceRegistrationQueueImplService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeviceRegistrationQueueImplService],
    }).compile()

    service = module.get<DeviceRegistrationQueueImplService>(
      DeviceRegistrationQueueImplService,
    )
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})

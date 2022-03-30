import { Test, TestingModule } from '@nestjs/testing'
import { TimeProviderImplService } from './time-provider-impl.service'

describe('TimeProviderImplService', () => {
  let service: TimeProviderImplService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TimeProviderImplService],
    }).compile()

    service = module.get<TimeProviderImplService>(TimeProviderImplService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})

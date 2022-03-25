import { Test, TestingModule } from '@nestjs/testing'
import { UnifiedActuatorStateFetcherService } from './unified-actuator-state-fetcher.service'

describe('UnifiedActuatorStateFetcherService', () => {
  let service: UnifiedActuatorStateFetcherService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UnifiedActuatorStateFetcherService],
    }).compile()

    service = module.get<UnifiedActuatorStateFetcherService>(
      UnifiedActuatorStateFetcherService,
    )
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})

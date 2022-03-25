import { Test, TestingModule } from '@nestjs/testing'
import { ActuatorStateFetcherService } from './actuator-state-fetcher.service'

describe('ActuatorStateFetcherService', () => {
  let service: ActuatorStateFetcherService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ActuatorStateFetcherService],
    }).compile()

    service = module.get<ActuatorStateFetcherService>(
      ActuatorStateFetcherService,
    )
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})

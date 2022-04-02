import { Test, TestingModule } from '@nestjs/testing'
import { SwitchImplService } from './switch-impl.service'

describe.skip('SwitchImplService', () => {
  let service: SwitchImplService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SwitchImplService],
    }).compile()

    service = module.get<SwitchImplService>(SwitchImplService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})

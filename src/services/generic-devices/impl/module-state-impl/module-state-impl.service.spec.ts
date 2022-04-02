import { Test, TestingModule } from '@nestjs/testing'
import { ModuleStateImplService } from './module-state-impl.service'

describe.skip('ModuleStateImplService', () => {
  let service: ModuleStateImplService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ModuleStateImplService],
    }).compile()

    service = module.get<ModuleStateImplService>(ModuleStateImplService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})

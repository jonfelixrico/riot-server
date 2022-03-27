import { Test, TestingModule } from '@nestjs/testing'
import { ActuatorImplService } from './actuator-impl.service'

describe('ActuatorImplService', () => {
  let service: ActuatorImplService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ActuatorImplService],
    }).compile()

    service = module.get<ActuatorImplService>(ActuatorImplService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})

import { Test, TestingModule } from '@nestjs/testing'
import { ActuatorStateResponderService } from './actuator-state-responder.service'

describe('ActuatorStateResponderService', () => {
  let service: ActuatorStateResponderService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ActuatorStateResponderService],
    }).compile()

    service = module.get<ActuatorStateResponderService>(
      ActuatorStateResponderService,
    )
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})

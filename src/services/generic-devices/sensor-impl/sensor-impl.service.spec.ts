import { Test, TestingModule } from '@nestjs/testing'
import { SensorImplService } from './sensor-impl.service'

describe('SensorImplService', () => {
  let service: SensorImplService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SensorImplService],
    }).compile()

    service = module.get<SensorImplService>(SensorImplService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})

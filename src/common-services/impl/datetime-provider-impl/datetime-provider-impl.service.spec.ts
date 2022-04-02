import { Test, TestingModule } from '@nestjs/testing'
import { DatetimeProviderImplService } from './datetime-provider-impl.service'

describe.skip('DatetimeProviderImplService', () => {
  let service: DatetimeProviderImplService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DatetimeProviderImplService],
    }).compile()

    service = module.get<DatetimeProviderImplService>(
      DatetimeProviderImplService,
    )
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})

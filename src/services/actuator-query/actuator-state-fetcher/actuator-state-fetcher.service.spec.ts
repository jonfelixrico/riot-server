import { Test, TestingModule } from '@nestjs/testing'
import { delay } from 'bluebird'
import { Subject } from 'rxjs'
import { REQUEST_BUS, RESPONSE_BUS } from '../actuator-query-subjects.di-tokens'
import { StateQueryRequest, StateQueryResponse } from '../actuator-query.types'
import {
  ActuatorStateFetcherService,
  ActuatorStateFetcherTimeoutError,
} from './actuator-state-fetcher.service'

describe('ActuatorStateFetcherService', () => {
  let service: ActuatorStateFetcherService
  let requestBus: Subject<StateQueryRequest>
  let responseBus: Subject<StateQueryResponse>

  beforeEach(async () => {
    requestBus = new Subject<StateQueryRequest>()
    responseBus = new Subject<StateQueryResponse>()

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ActuatorStateFetcherService,
        {
          provide: REQUEST_BUS,
          useValue: requestBus,
        },
        {
          provide: RESPONSE_BUS,
          useValue: responseBus,
        },
      ],
    }).compile()

    service = module.get<ActuatorStateFetcherService>(
      ActuatorStateFetcherService,
    )
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should throw because of timeout', async () => {
    try {
      await service.queryState(
        {
          actuatorId: 'dummy',
          deviceId: 'dummy',
          type: 'dummy',
        },
        3500,
        'dummy',
      )
    } catch (e) {
      expect(e).toBeInstanceOf(ActuatorStateFetcherTimeoutError)
    }
  })

  it('should return state value', async () => {
    service
      .queryState<string>(
        {
          actuatorId: 'dummy',
          deviceId: 'dummy',
          type: 'dummy',
        },
        3000,
        'dummy',
      )
      .then((val) => expect(val).toEqual('dummyState'))

    await delay(1000)

    responseBus.next({
      jobId: 'dummy',
      type: 'ACK',
    })

    responseBus.next({
      jobId: 'dummy',
      type: 'ANSWER',
      state: 'dummyState',
    })
  })

  it('should throw error if response is error', async () => {
    service
      .queryState<string>(
        {
          actuatorId: 'dummy',
          deviceId: 'dummy',
          type: 'dummy',
        },
        3000,
        'dummy',
      )
      .catch((err) =>
        expect(err).not.toBeInstanceOf(ActuatorStateFetcherTimeoutError),
      )

    await delay(1000)

    responseBus.next({
      jobId: 'dummy',
      type: 'ACK',
    })

    responseBus.next({
      jobId: 'dummy',
      type: 'ERROR',
      error: new Error('dummyError'),
    })
  })
})

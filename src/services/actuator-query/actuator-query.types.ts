export interface ActuatorQueryRequest {
  deviceId: string
  actuatorId: string
  type: string
  jobId: string
}

export interface ActuatorQueryResponseAck {
  jobId: string
  type: 'ACK'
}

export interface ActuatorQueryResponseAnswer<T = unknown> {
  jobId: string
  state: T
  type: 'ANSWER'
}

export interface ActuatorQueryResponseError {
  jobId: string
  type: 'ERROR'
  error: Error
}

export type ActuatorQueryResponse =
  | ActuatorQueryResponseAck
  | ActuatorQueryResponseAnswer
  | ActuatorQueryResponseError

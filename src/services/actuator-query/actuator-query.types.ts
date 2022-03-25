export interface StateQueryRequest {
  deviceId: string
  actuatorId: string
  type: string
  jobId: string
}

export interface StateQueryResponseAck {
  jobId: string
  type: 'ACK'
}

export interface StateQueryResponseAnswer<T = unknown> {
  jobId: string
  state: T
  type: 'ANSWER'
}

export interface StateQueryResponseError {
  jobId: string
  type: 'ERROR'
  error: Error
}

export type StateQueryResponse =
  | StateQueryResponseAck
  | StateQueryResponseAnswer
  | StateQueryResponseError

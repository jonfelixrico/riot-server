export interface Request {
  deviceId: string
  actuatorId: string
  type: string
  jobId: string
}

export interface ResponseAck {
  jobId: string
  type: 'ACK'
}

export interface ResponseAnswer<T = unknown> {
  jobId: string
  state: T
  type: 'ANSWER'
}

export interface ResponseError {
  jobId: string
  type: 'ERROR'
  error: Error
}

export type QueryResponse = ResponseAck | ResponseAnswer | ResponseError

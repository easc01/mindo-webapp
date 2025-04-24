interface APIResponse<T> {
  statusCode: number
  message: string
  data: T
}

interface Token {
  accessToken: string
}

export type { APIResponse, Token }

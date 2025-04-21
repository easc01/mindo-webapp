interface APIResponse<T> {
  statusCode: number
  message: string
  data: T
}

interface GoogleAuth {
  idToken: string
}

interface Token {
  accessToken: string
}

export type { APIResponse, GoogleAuth, Token }

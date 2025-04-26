interface APIResponse<T> {
  statusCode: number
  message: string
  data: T
}

interface Token {
  accessToken: string
}

interface ClassNames {
  component?: string
}

export type { APIResponse, Token, ClassNames }

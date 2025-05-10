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

interface ConnectSocketParams {
  url: string
  onOpen?: (e: Event) => void
  onMessage?: (data: any) => void
  onClose?: (e: CloseEvent) => void
  onError?: (e: Event) => void
}

interface SocketMessage {
  messageId: string
  messageGroupId: string
  userId: string
  name: string
  username: string
  userProfilePic: string
  userColor: string
  communityId: string
  content: string
  timestamp: Date
}

export type {
  APIResponse,
  Token,
  ClassNames,
  ConnectSocketParams,
  SocketMessage,
}

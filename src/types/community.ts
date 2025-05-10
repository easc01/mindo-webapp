interface CommunityType {
  id: string
  title: string
  about: string
  thumbnailUrl: string
  logoUrl: string
  updatedAt: Date
  createdAt: Date
  updatedBy: string
}

interface MessageGroupType {
  messageGroupId: string
  userId: string
  name: string
  username: string
  userColor: string
  userProfilePic: string
  messages: MessageDTO[]
}

interface MessageDTO {
  id: string
  content: string
  timestamp: Date
}

interface ChatUIState {
  messageInputMap: Record<string, string>
}

export type { CommunityType, MessageGroupType, MessageDTO, ChatUIState }

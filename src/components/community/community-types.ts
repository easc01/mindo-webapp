import { MessageGroupType } from '@/types/community'

interface MessageGroupProps {
  currentUserId: string
  data: MessageGroupType
}

interface MessageWindowProps {
  communityId: string
}

interface MessageInputProps {
  communityId: string
  onSendMessage: (message: any) => void
}

export type { MessageGroupProps, MessageWindowProps, MessageInputProps }

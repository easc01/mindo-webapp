import { MessageGroupType } from '@/types/community'

interface MessageGroupProps {
  currentUserId: string
  data: MessageGroupType
}

interface MessageWindowProps {
  communityId: string
}

export type { MessageGroupProps, MessageWindowProps }

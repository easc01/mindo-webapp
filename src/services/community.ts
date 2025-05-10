import useApi from '@/lib/api'
import API_URLS from '@/lib/api-urls'
import { APIResponse } from '@/types/common'
import { MessageGroupType } from '@/types/community'

const useMessageHistory = (
  communityId: string,
  lastMessageTimestamp?: Date
) => {
  const { useGet } = useApi()
  return useGet<APIResponse<MessageGroupType[]>>(
    API_URLS.COMMUNITIES.MESSAGES(communityId, lastMessageTimestamp),
    [API_URLS.COMMUNITIES.MESSAGES(communityId, lastMessageTimestamp)],
  )
}

export { useMessageHistory }

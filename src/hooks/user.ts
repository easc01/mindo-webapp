import useApi from '@/lib/api'
import API_URLS from '@/lib/api-urls'
import { APIResponse } from '@/types/common'
import { UserData } from '@/types/user'

export const useGetUser = (enabled?: boolean) => {
  const { useGet } = useApi()
  return useGet<APIResponse<UserData>>(
    API_URLS.USER.USER,
    [API_URLS.USER.USER],
    enabled
  )
}

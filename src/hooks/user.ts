import useApi from '@/lib/api'
import API_URLS from '@/lib/api-urls'
import { appConfig } from '@/lib/config'
import { APIResponse, Token } from '@/types/common'
import { UserDataType } from '@/types/user'

export const useSignIn = () => {
  const { usePost } = useApi()
  return usePost<APIResponse<UserDataType>>(API_URLS.AUTH.GOOGLE_SIGNIN, [
    API_URLS.AUTH.GOOGLE_SIGNIN,
  ])
}

export const useGetUser = (enabled?: boolean) => {
  const { useGet } = useApi()
  return useGet<APIResponse<UserDataType>>(
    API_URLS.USER.USER,
    [API_URLS.USER.USER],
    enabled
  )
}

export const useUpdateUser = (userId: string) => {
  const { usePut } = useApi()
  return usePut<UserDataType>(`${API_URLS.USER.USER}/${userId}`, [
    API_URLS.USER.USER,
    userId,
  ])
}

export const refreshUserToken = async () => {
  try {
    const response = await fetch(
      `${appConfig.serverBaseUrl}${API_URLS.AUTH.REFRESH}`,
      {
        method: 'POST',
        credentials: 'include',
      }
    )

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error?.message || `HTTP error: ${response.status}`)
    }

    const data: APIResponse<Token> = await response.json()
    return { data, statusCode: response.status }
  } catch (error) {
    return { data: null, statusCode: 404 }
  }
}

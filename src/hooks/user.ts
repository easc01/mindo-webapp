import useApi from '@/lib/api'
import API_URLS from '@/lib/api-urls'
import { APIResponse, GoogleAuth, Token } from '@/types/common'
import { UserData } from '@/types/user'
import { useMutation } from '@tanstack/react-query'

export const useSignIn = () => {
  const { usePost } = useApi()
  return usePost<GoogleAuth>(API_URLS.AUTH.GOOGLE_SIGNIN, [
    API_URLS.AUTH.GOOGLE_SIGNIN,
  ])
}

export const useGetUser = (enabled?: boolean) => {
  const { useGet } = useApi()
  return useGet<APIResponse<UserData>>(
    API_URLS.USER.USER,
    [API_URLS.USER.USER],
    enabled
  )
}

export const useUpdateUser = (userId: string) => {
  const { usePut } = useApi()
  return usePut<UserData>(`${API_URLS.USER.USER}/${userId}`, [
    API_URLS.USER.USER,
    userId,
  ])
}

export const refreshUserToken = async () => {
  const response = await fetch(API_URLS.AUTH.REFRESH, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error?.message || `HTTP error: ${response.status}`)
  }

  const data: APIResponse<Token> = await response.json()
  return { data, statusCode: response.status }
}

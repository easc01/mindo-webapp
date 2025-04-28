/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  QueryClient,
  useQuery,
  useMutation,
  UseQueryResult,
  UseMutationResult,
} from '@tanstack/react-query'
import { appConfig } from './config'
import { useNavigate } from 'react-router-dom'
import ROUTES from '@/navigation/routes'
import { useDispatch } from 'react-redux'
import { resetUserData, updateUserData } from '@/store/user-data-slice'
import { refreshUserToken } from '@/hooks/user'
import { ACCESS_TOKEN_KEY } from './constants'

enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

interface RequestOptions {
  method: HttpMethod
  headers?: Record<string, string>
  body?: any
}

const queryClient = new QueryClient()

const invalidateQueryKeys = (queryKeys: (string | object)[]) => {
  if (!queryKeys) return

  queryKeys.forEach((key) => {
    queryClient.invalidateQueries({
      queryKey: [key],
      exact: true,
      type: 'all',
    })
  })
}

const useApi = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const baseUrl = appConfig.serverBaseUrl
  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY) ?? ''

  const request = async (
    endpoint: string,
    options: RequestOptions
  ): Promise<any> => {
    const url = `${baseUrl}${endpoint}`

    const doFetch = async (token: string) =>
      fetch(url, {
        method: options.method,
        headers: {
          'Content-Type': 'application/json',
          ...(accessToken ? { Authorization: token } : {}),
          ...options.headers,
        },
        body: options.body ? JSON.stringify(options.body) : undefined,
      })

    let response = await doFetch(accessToken)

    // refresh the token
    if (response.status === 401) {
      const { statusCode, data } = await refreshUserToken()

      // refresh token expired, relogin user
      if (statusCode === 401) {
        dispatch(resetUserData())
        navigate(ROUTES.SIGN_IN)
      }

      // token refreshed
      if (data && statusCode === 202) {
        dispatch(
          updateUserData({
            accessToken: data.data.accessToken,
          })
        )
        // retry with the new token
        response = await doFetch(data.data.accessToken)
      }
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  }

  const useGet = <T>(
    endpoint: string,
    queryKey: (string | object)[],
    enabled?: boolean
  ): UseQueryResult<T, Error> => {
    return useQuery({
      queryKey,
      queryFn: () => request(endpoint, { method: HttpMethod.GET }),
      retry: enabled ? Infinity : 0,
      retryDelay: 1500,
      enabled: enabled ?? true,
    })
  }

  const usePostQuery = <T, TVariables = any>(
    endpoint: string,
    body: TVariables,
    queryKey: (string | object)[],
    options?: {
      enabled?: boolean
      retry?: number
      retryDelay?: number
    }
  ): UseQueryResult<T, Error> => {
    return useQuery({
      queryKey,
      queryFn: () =>
        request(endpoint, {
          method: HttpMethod.POST,
          body,
        }),
      retry: options?.retry ?? 3,
      retryDelay: options?.retryDelay ?? 500,
      enabled: options?.enabled ?? true,
    })
  }

  const usePost = <T, TVariables = any>(
    endpoint: string,
    queryKeys?: (string | object)[]
  ): UseMutationResult<T, Error, TVariables> => {
    return useMutation({
      mutationFn: (body: TVariables) =>
        request(endpoint, { method: HttpMethod.POST, body }),
      onSuccess: () => {
        invalidateQueryKeys(queryKeys ?? [])
      },
      retry: false,
    })
  }

  const usePut = <T>(
    endpoint: string,
    queryKeys?: (string | object)[]
  ): UseMutationResult<T, Error, any> => {
    return useMutation({
      mutationFn: (body: any) =>
        request(endpoint, { method: HttpMethod.PUT, body }),
      onSuccess: () => {
        invalidateQueryKeys(queryKeys ?? [])
      },
    })
  }

  const useDelete = <T>(
    endpoint: string,
    queryKeys?: (string | object)[]
  ): UseMutationResult<T, Error, void> => {
    return useMutation({
      mutationFn: () => request(endpoint, { method: HttpMethod.DELETE }),
      onSuccess: () => {
        invalidateQueryKeys(queryKeys ?? [])
      },
    })
  }

  return { useGet, usePost, usePut, useDelete, usePostQuery }
}

export default useApi
export { HttpMethod, queryClient, invalidateQueryKeys }

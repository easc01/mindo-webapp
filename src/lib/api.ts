/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  QueryClient,
  useQuery,
  useMutation,
  UseQueryResult,
  UseMutationResult,
  UseQueryOptions,
  UseMutationOptions,
} from '@tanstack/react-query'
import { appConfig } from './config'
import { useNavigate } from 'react-router-dom'
import ROUTES from '@/navigation/routes'
import { useDispatch } from 'react-redux'
import { resetUserData } from '@/store/user-data-slice'
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

// Define default query and mutation options
const defaultQueryOptions = {
  retry: 3,
  retryDelay: 1500,
  refetchOnWindowFocus: true,
  staleTime: 5 * 60 * 1000, // 5 minutes
}

const defaultMutationOptions = {
  retry: 0,
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: defaultQueryOptions,
    mutations: defaultMutationOptions,
  },
})

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
        localStorage.setItem(ACCESS_TOKEN_KEY, data.data.accessToken)
        // retry with the new token
        response = await doFetch(data.data.accessToken)
      }
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  }

  /**
   * Enhanced useGet hook that accepts full React Query options
   */
  const useGet = <T>(
    endpoint: string,
    queryKey: (string | object)[],
    options?: Omit<UseQueryOptions<T, Error, T, any[]>, 'queryKey' | 'queryFn'>
  ): UseQueryResult<T, Error> => {
    return useQuery({
      queryKey,
      queryFn: () => request(endpoint, { method: HttpMethod.GET }),
      ...options,
    })
  }

  /**
   * Enhanced usePostQuery hook with full React Query options
   */
  const usePostQuery = <T, TVariables = any>(
    endpoint: string,
    body: TVariables,
    queryKey: (string | object)[],
    options?: Omit<UseQueryOptions<T, Error, T, any[]>, 'queryKey' | 'queryFn'>
  ): UseQueryResult<T, Error> => {
    return useQuery({
      queryKey,
      queryFn: () =>
        request(endpoint, {
          method: HttpMethod.POST,
          body,
        }),
      ...options,
    })
  }

  /**
   * Enhanced usePost hook with full React Query mutation options
   */
  const usePost = <T, TVariables = any>(
    endpoint: string,
    queryKeys?: (string | object)[],
    options?: Omit<UseMutationOptions<T, Error, TVariables, unknown>, 'mutationFn'>
  ): UseMutationResult<T, Error, TVariables> => {
    return useMutation({
      mutationFn: (body: TVariables) =>
        request(endpoint, { method: HttpMethod.POST, body }),
      onSuccess: (data, variables, context) => {
        invalidateQueryKeys(queryKeys ?? [])
        options?.onSuccess?.(data, variables, context)
      },
      ...options,
    })
  }

  /**
   * Enhanced usePut hook with full React Query mutation options
   */
  const usePut = <T, TVariables = any>(
    endpoint: string,
    queryKeys?: (string | object)[],
    options?: Omit<UseMutationOptions<T, Error, TVariables, unknown>, 'mutationFn'>
  ): UseMutationResult<T, Error, TVariables> => {
    return useMutation({
      mutationFn: (body: TVariables) =>
        request(endpoint, { method: HttpMethod.PUT, body }),
      onSuccess: (data, variables, context) => {
        invalidateQueryKeys(queryKeys ?? [])
        options?.onSuccess?.(data, variables, context)
      },
      ...options,
    })
  }

  /**
   * Enhanced useDelete hook with full React Query mutation options
   */
  const useDelete = <T, TVariables = any>(
    endpoint: string,
    queryKeys?: (string | object)[],
    options?: Omit<UseMutationOptions<T, Error, TVariables, unknown>, 'mutationFn'>
  ): UseMutationResult<T, Error, TVariables> => {
    return useMutation({
      mutationFn: () => 
        request(endpoint, { method: HttpMethod.DELETE }),
      onSuccess: (data, variables, context) => {
        invalidateQueryKeys(queryKeys ?? [])
        options?.onSuccess?.(data, variables, context)
      },
      ...options,
    })
  }

  return { useGet, usePost, usePut, useDelete, usePostQuery }
}

export default useApi
export { HttpMethod, queryClient, invalidateQueryKeys }
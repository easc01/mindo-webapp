/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  QueryClient,
  useQuery,
  useMutation,
  UseQueryResult,
  UseMutationResult,
} from '@tanstack/react-query'
import { appConfig } from './config'

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
  const baseUrl = appConfig.serverBaseUrl || 'http://localhost:8080/api/'
  const accessToken = localStorage.getItem('accessToken')

  const request = async (
    endpoint: string,
    options: RequestOptions
  ): Promise<any> => {
    const url = `${baseUrl}${endpoint}`
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `${accessToken}`,
      ...options.headers,
    }

    try {
      const response = await fetch(url, {
        method: options.method,
        headers,
        body: options.body ? JSON.stringify(options.body) : undefined,
      })

      if (response.status === 403) {
        // re route to login page
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Fetch error:', error)
      throw error
    }
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

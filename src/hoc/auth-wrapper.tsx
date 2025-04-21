import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Loader from '@/components/ui/loader'
import { updateUserData } from '@/store/user-data'
import ROUTES from '@/navigation/routes'
import { ACCESS_TOKEN_KEY } from '@/lib/constants'
import { appConfig } from '@/lib/config'
import API_URLS from '@/lib/api-urls'
import { HttpMethod } from '@/lib/api'
import { useGetUser } from '@/hooks/user'

const loginAndGetUser = async () => {
  try {
    const loginUrl = `${appConfig.serverBaseUrl}${API_URLS.AUTH.GOOGLE_SIGNIN}`
    const response = await fetch(loginUrl, {
      method: HttpMethod.POST,
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({}),
    })

    if (response.ok) {
      const data = await response.json()
      return data
    } else {
      throw new Error(`Login failed: ${response.status} ${response.statusText}`)
    }
  } catch (error) {
    console.error('Fetch access token error:', error)
    throw error
  }
}

const setAccessTokenAndUser = async () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY)
  const loginAndGetUserResponse = await loginAndGetUser()
  localStorage.setItem(
    ACCESS_TOKEN_KEY,
    loginAndGetUserResponse.data.authTokens.accessToken
  )
  return loginAndGetUserResponse.data
}

const AuthWrapper = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const HOC: React.FC<P> = (props) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { data, error } = useGetUser()
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
      if (data?.data) {
        dispatch(updateUserData(data?.data))
      } else {
        localStorage.removeItem(ACCESS_TOKEN_KEY)
      }
    }, [data])

    useEffect(() => {
      const checkAccessToken = async () => {
        try {
          setIsLoading(true)
          const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY)
          if (accessToken?.length) {
          } else {
            const loginAndGetUserResponseData = await setAccessTokenAndUser()
            dispatch(updateUserData(loginAndGetUserResponseData.user))
          }
        } catch (err) {
          localStorage.removeItem(ACCESS_TOKEN_KEY)
          navigate(ROUTES.ERROR_403)
        } finally {
          setIsLoading(false)
        }
      }

      checkAccessToken()
    }, [])

    if (isLoading) {
      return (
        <Loader
          label='Authenticating...'
          isHorizontal={false}
          className='h-screen w-screen'
          labelStyle='text-lg'
        />
      )
    }

    if (error) {
      return <>Something went wrong...</>
    }

    return <WrappedComponent {...props} />
  }

  return HOC
}

export default AuthWrapper

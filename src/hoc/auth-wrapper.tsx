import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Loader from '@/components/ui/loader'
import { resetUserData, updateUserData } from '@/store/user-data'
import ROUTES from '@/navigation/routes'
import { refreshUserToken, useGetUser } from '@/hooks/user'
import { useAppSelector } from '@/hooks/redux'

const AuthWrapper = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const HOC: React.FC<P> = (props) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { accessToken } = useAppSelector((state) => state.userData)
    const { data: newUserData, error } = useGetUser(!!accessToken) // enable api only when accessToken is available

    const [isLoading, setIsLoading] = useState<boolean>(true)

    const handleAuth = async () => {
      setIsLoading(true)
      if (accessToken) {
        // check if token is expired by checking api response of getUser
        if (newUserData?.statusCode === 401) {
          // refresh the token
          const { data, statusCode } = await refreshUserToken()
          if (statusCode === 401) {
            // refresh token is expired, sign in again
            dispatch(resetUserData())
            navigate(ROUTES.SIGN_IN)
          } else {
            // refresh successful
            // update useEffect dependency to re run handleAuth() again with new token
            dispatch(
              updateUserData({
                accessToken: data.data.accessToken,
              })
            )
          }
        } else {
          // success case: token was valid
          //  send inside app & save user data to redux
          if (newUserData?.data) {
            dispatch(updateUserData(newUserData?.data)) // handle blank accessToken
          }
        }
      } else {
        // send user to sign-in page
        dispatch(resetUserData())
        navigate(ROUTES.SIGN_IN)
      }

      setIsLoading(false)
    }

    useEffect(() => {
      handleAuth()
    }, [accessToken])

    if (isLoading) {
      return <Loader className='h-screen w-screen' />
    }

    if (error) {
      return <>Auth went wrong...</>
    }

    return <WrappedComponent {...props} />
  }

  return HOC
}

export default AuthWrapper

import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Loader from '@/components/ui/loader'
import { resetUserData, updateUserData } from '@/store/user-data'
import ROUTES from '@/navigation/routes'
import { refreshUserToken } from '@/hooks/user'
import { useAppSelector } from '@/hooks/redux'

const AuthWrapper = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const HOC: React.FC<P> = (props) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { accessToken } = useAppSelector((state) => state.userData)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const initAuth = async () => {
      if (!accessToken) {
        setIsLoading(true)
        const { data, statusCode } = await refreshUserToken()

        if (statusCode === 202 && data.data.accessToken) {
          dispatch(
            updateUserData({
              accessToken: data.data.accessToken,
            })
          )
        } else {
          dispatch(resetUserData())
          navigate(ROUTES.SIGN_IN)
        }
        setIsLoading(false)
      }
    }

    useEffect(() => {
      initAuth()
    }, [])

    if (isLoading) {
      return <Loader className='h-screen w-screen' />
    }

    return <WrappedComponent {...props} />
  }

  return HOC
}

export default AuthWrapper

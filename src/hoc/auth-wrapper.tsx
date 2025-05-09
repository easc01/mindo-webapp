import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { resetUserData, updateUserData } from '@/store/user-data-slice'
import ROUTES from '@/navigation/routes'
import { ACCESS_TOKEN_KEY } from '@/lib/constants'
import { useGetUser } from '@/hooks/user'

const AuthWrapper = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const HOC: React.FC<P> = (props) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY)
    const { data } = useGetUser(!!accessToken)

    useEffect(() => {
      if (!accessToken) {
        dispatch(resetUserData())
        navigate(ROUTES.SIGN_IN)
      } else {
        if (data) {
          dispatch(updateUserData(data.data))
        }
      }
    }, [data])

    return <WrappedComponent {...props} />
  }

  return HOC
}

export default AuthWrapper

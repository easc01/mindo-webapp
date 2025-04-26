import { GoogleLogin, CredentialResponse } from '@react-oauth/google'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import messages from '@/lib/messages'
import { useSignIn } from '@/hooks/user'
import { useAppDispatch } from '@/hooks/redux'
import { resetUserData, updateUserData } from '@/store/user-data-slice'
import { useNavigate } from 'react-router-dom'
import ROUTES from '@/navigation/routes'
import { ACCESS_TOKEN_KEY } from '@/lib/constants'
import { useDialog } from '@/context/dialog-context'

const SignIn: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { mutateAsync: onSignIn } = useSignIn()
  const { closeDialog } = useDialog()

  const handleLoginSuccess = async (res: CredentialResponse) => {
    try {
      await onSignIn(
        {
          accessToken: res.credential,
        },
        {
          onSuccess: (data) => {
            localStorage.setItem(ACCESS_TOKEN_KEY, data.data.accessToken)
            dispatch(updateUserData(data.data))
            closeDialog()
            navigate(ROUTES.PLAYLIST.MAIN)
          },
          onError: (error) => {
            dispatch(resetUserData())
            localStorage.removeItem(ACCESS_TOKEN_KEY)
            throw error
          },
        }
      )
    } catch (error) {
      toast(messages.error.generic)
    }
  }

  const handleLoginFailure = () => {
    toast(messages.error.generic)
  }

  return (
    <div className='w-60 md:w-80'>
      <h2 className='mb-4 text-center text-2xl font-medium'>Sign In</h2>

      <div className='mb-2 flex flex-col gap-2'>
        <Input
          placeholder='Username, email or mobile'
          className='bg-app-dark-0 border-app-dark-2'
          disabled
        />
        <Input
          placeholder='Password'
          className='bg-app-dark-0 border-app-dark-2'
          disabled
        />
        <Button className='w-full text-lg font-light' disabled>
          Sign In
        </Button>
      </div>

      <span className='text-muted text-center text-xs'>
        <p>Coming Soon, use Google for now</p>
      </span>

      <div className='my-3 flex items-center gap-2'>
        <div className='bg-app-dark-2 h-0.5 w-full'></div>
        <span className='text-app-dark-2 text-sm'>or</span>
        <div className='bg-app-dark-2 h-0.5 w-full'></div>
      </div>

      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={handleLoginFailure}
      />
    </div>
  )
}

export default SignIn

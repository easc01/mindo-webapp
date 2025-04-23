import { GoogleLogin, CredentialResponse } from '@react-oauth/google'
import { appConfig } from '@/lib/config'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface Props {}

const SignIn: React.FC<Props> = () => {
  const handleLoginSuccess = (res: CredentialResponse) => {
    const myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')

    const raw = JSON.stringify({
      accessToken: res.credential,
    })

    fetch(`${appConfig.serverBaseUrl}/api/auth/google`, {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    })
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error))
  }

  // const handleRefreshToken = () => {
  //   const myHeaders = new Headers()
  //   myHeaders.append('Content-Type', 'application/json')

  //   fetch(`${appConfig.serverBaseUrl}/api/auth/refresh`, {
  //     method: 'POST',
  //     credentials: 'include',
  //     headers: myHeaders,
  //     redirect: 'follow',
  //   })
  //     .then((response) => response.text())
  //     .then((result) => console.log(result))
  //     .catch((error) => console.error(error))
  // }

  const handleLoginFailure = () => console.log('Failed')

  return (
    <div className='min-w-80'>
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

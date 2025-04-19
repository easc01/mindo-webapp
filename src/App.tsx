import {
  GoogleOAuthProvider,
  GoogleLogin,
  CredentialResponse,
} from '@react-oauth/google'
import { appConfig } from './lib/config'

function App() {
  // TODO: refactor into Sign-in component
  const handleLoginSuccess = (res: CredentialResponse) => {
    console.log(res)
    const myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')

    const raw = JSON.stringify({
      idToken: res.credential,
      accessToken: 'accessToken',
    })

    fetch(`${appConfig.serverBaseUrl}/auth/google`, {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    })
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error))
  }

  const handleLoginFailure = () => console.log('Failed')

  return (
    <GoogleOAuthProvider clientId={appConfig.googleClientId}>
      <div>
        <h2>Google Login</h2>
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={handleLoginFailure}
        />
      </div>
    </GoogleOAuthProvider>
  )
}

export default App

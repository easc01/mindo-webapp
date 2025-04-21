import {
  GoogleOAuthProvider,
  GoogleLogin,
  CredentialResponse,
} from '@react-oauth/google'
import { appConfig } from './lib/config'
import { BrowserRouter } from 'react-router-dom'
import PageRouter from '@/navigation/page-router'
import { Provider } from 'react-redux'
import { store } from '@/store/store'
import { QueryClientProvider } from '@tanstack/react-query'
import { ErrorBoundary } from 'react-error-boundary'
import { queryClient } from '@/lib/api'
import ErrorFallBack from '@/pages/errors/error-fallback'

const TApp = () => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ErrorBoundary
            FallbackComponent={ErrorFallBack}
            onReset={() => {
              window.location.href = '/'
            }}
            onError={(error, info) => {
              console.error('ErrorBoundary caught an error:', error, info)
            }}
          >
            <PageRouter />
          </ErrorBoundary>
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  )
}

function App() {
  // TODO: refactor into Sign-in component
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

  const handleRefreshToken = () => {
    const myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')

    fetch(`${appConfig.serverBaseUrl}/api/auth/refresh`, {
      method: 'POST',
      credentials: 'include',
      headers: myHeaders,
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

        <button onClick={handleRefreshToken}>Refresh My Token</button>
      </div>
    </GoogleOAuthProvider>
  )
}

export default App

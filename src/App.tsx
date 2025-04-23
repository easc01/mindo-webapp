import { BrowserRouter } from 'react-router-dom'
import PageRouter from '@/navigation/page-router'
import { Provider } from 'react-redux'
import { store } from '@/store/store'
import { QueryClientProvider } from '@tanstack/react-query'
import { ErrorBoundary } from 'react-error-boundary'
import { queryClient } from '@/lib/api'
import ErrorFallBack from '@/pages/errors/error-fallback'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { appConfig } from '@/lib/config'

const App = () => {
  return (
    <GoogleOAuthProvider clientId={appConfig.googleClientId}>
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
    </GoogleOAuthProvider>
  )
}

export default App

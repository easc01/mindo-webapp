import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/index.css'
import { store } from '@/store/store'
import { Provider } from 'react-redux'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/lib/api.ts'
import App from '@/App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <App />
      </Provider>
    </QueryClientProvider>
  </StrictMode>
)

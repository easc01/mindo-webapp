import { useEffect } from 'react'
import { FallbackProps } from 'react-error-boundary'
import { useNavigate } from 'react-router-dom'
import ROUTES from '@/navigation/routes'

export default function ErrorFallBack({ resetErrorBoundary }: FallbackProps) {
  const navigate = useNavigate()

  const handleClick = () => {
    resetErrorBoundary()
    navigate(ROUTES.LAUNCH_SCREEN)
  }

  useEffect(() => {
    window.history.replaceState(null, '', '/')

    const handlePopState = () => {
      window.location.replace('/')
    }
    window.addEventListener('popstate', handlePopState)

    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [])

  return (
    <div className='bg-background h-full w-full flex-col text-center'>
      <p>Something went wrong</p>
      <div className='absolute bottom-35 w-full'>
        <button onClick={handleClick}>Back To Home</button>
      </div>
    </div>
  )
}

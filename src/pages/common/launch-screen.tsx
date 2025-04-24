import ROUTES from '@/navigation/routes'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const LaunchScreen: React.FC = () => {
  const navigate = useNavigate()

  useEffect(() => {
    navigate(ROUTES.PLAYLIST.PLAYLIST_MAIN)
  }, [])

  return <></>
}

export default LaunchScreen

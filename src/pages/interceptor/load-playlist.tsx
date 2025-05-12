import Loader from '@/components/common/loader'
import ROUTES from '@/navigation/routes'
import { useGeneratePlaylist } from '@/services/playlist'
import { useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

const LoadPlaylist: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { playlistTitle } = useParams()
  const { isFetched, error, data } = useGeneratePlaylist(playlistTitle!)

  useEffect(() => {
    if (isFetched && data) {
      const playlistId = data.data.id
      navigate(ROUTES.PLAYLIST.PLAYLIST(playlistId), {
        replace: true,
      })
    }
  }, [isFetched, data])

  useEffect(() => {
    if (error) {
      const previousPath = location.state?.from || ROUTES.LAUNCH_SCREEN
      navigate(previousPath, { replace: true })
    }
  }, [error])

  return <Loader />
}

export default LoadPlaylist

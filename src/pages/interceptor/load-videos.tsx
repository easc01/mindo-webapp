import Loader from '@/components/common/loader'
import ROUTES from '@/navigation/routes'
import { useFetchTopicVideos } from '@/services/playlist'
import { useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

const LoadVideos: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { playlistId, topicId } = useParams()
  const { isFetched, error, data } = useFetchTopicVideos(topicId!)

  useEffect(() => {
    if (isFetched && data) {
      const fetchedVideoId = data.data.video.videoId
      navigate(ROUTES.PLAYLIST.VIDEO(playlistId, topicId, fetchedVideoId), {
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

export default LoadVideos

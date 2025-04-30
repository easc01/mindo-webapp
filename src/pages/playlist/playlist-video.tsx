import MainWrapper from '@/components/common/main-wrapper'
import VideoPlayer from '@/components/common/video-player'
import Bar from '@/components/common/bar'
import {
  LessonNotes,
  PlaylistPreviewLabels,
  PlaylistSection,
  VideoPreview,
  VideoPreviewLabels,
} from '@/components/playlist/playlist'
import { useEffect } from 'react'
import { useFetchTopicVideos } from '@/services/playlist'
import { useParams } from 'react-router-dom'
import { timeAgo } from '@/lib/utils'

const PlaylistVideoPage: React.FC = () => {
  const { playlistId, topicId, videoId } = useParams()
  const { data } = useFetchTopicVideos(topicId ?? '', videoId ?? '')

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'instant',
    })
  }, [])

  if (data) {
    const {
      data: { moreVideos, video },
    } = data
    return (
      <MainWrapper className='flex h-full flex-col gap-6 overflow-y-auto p-8'>
        <VideoPlayer url={`https://www.youtube.com/watch?v=${video.videoId}`} />

        <VideoPreviewLabels
          title={video.title}
          uploadDate={timeAgo(video.videoPublishedAt)}
          channelName={video.channelTitle}
          classNames={{
            component: 'flex flex-col gap-2',
            title: 'text-xl font-bold',
            subLabels: 'text-base ',
          }}
        />

        <Bar />
        <LessonNotes lessonName={video.title} />
        <Bar />

        <h3 className='text-xl font-bold'>You might also like</h3>

        <PlaylistSection scrollDirection='horizontal'>
          {moreVideos.map((video) => (
            <VideoPreview
              key={video.id}
              playlistId={playlistId ?? ''}
              video={video}
            />
          ))}
        </PlaylistSection>
      </MainWrapper>
    )
  }
}

export default PlaylistVideoPage

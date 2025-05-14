import { useMemo, useState } from 'react'
import Fuse from 'fuse.js'
import MainWrapper from '@/components/common/main-wrapper'
import {
  PlaylistBanner,
  PlaylistGrid,
  PlaylistTopic,
  PlaylistTopicsHeader,
} from '@/components/playlist/playlist'
import { usePlaylistByIdQuery } from '@/services/playlist'
import { useParams } from 'react-router-dom'
import { timeAgo } from '@/lib/utils'
import ImageFallback from '@/assets/images/books.png'
import Loader from '@/components/common/loader'

const PlaylistDedicatedPage: React.FC = () => {
  const { playlistId } = useParams()
  const { data, isLoading } = usePlaylistByIdQuery(playlistId ?? '')
  const topicList = data?.data.topics ?? []

  const [topicQuery, setTopicQuery] = useState<string>('')

  const topicsFuse = useMemo(() => {
    return new Fuse(topicList, {
      keys: ['name', 'topicNumber'],
      threshold: 0.3,
    })
  }, [topicList])

  const matchedTopics = useMemo(() => {
    return topicQuery
      ? topicsFuse.search(topicQuery).map((r) => r.item)
      : topicList
  }, [topicQuery, topicsFuse, topicList])

  const onTopicSearchTagChange = (s: string) => {
    setTopicQuery(s)
  }

  if (isLoading) {
    return <Loader />
  }

  if (data) {
    return (
      <MainWrapper className='overflow-auto'>
        <PlaylistBanner
          name={data.data.name}
          playlistCode={data.data.code}
          views={data.data.views}
          uploadDate={timeAgo(data.data.createdAt)}
          bannerUrl={ImageFallback}
        />

        <div className='w-full p-8'>
          <p>{data.data.description}</p>

          <div className='mt-8'>
            <PlaylistTopicsHeader
              searchTag={topicQuery}
              onSearchTagChange={onTopicSearchTagChange}
            />

            <PlaylistGrid>
              {matchedTopics.map((topic, i) => (
                <PlaylistTopic
                  key={i}
                  topicId={topic.id}
                  topicName={topic.name}
                  topicNumber={topic.topicNumber}
                  videoId={topic.videoId}
                />
              ))}
            </PlaylistGrid>
          </div>
        </div>
      </MainWrapper>
    )
  }
}

export default PlaylistDedicatedPage

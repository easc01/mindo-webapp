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

const PlaylistDedicatedPage: React.FC = () => {
  const { playlistId } = useParams()
  const { data } = usePlaylistByIdQuery(playlistId ?? '')
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

  if (data) {
    return (
      <MainWrapper className='overflow-auto'>
        <PlaylistBanner
          name={data.data.name}
          playlistCode={data.data.code}
          views={data.data.views}
          uploadDate={timeAgo(data.data.createdAt)}
          bannerUrl='https://lh3.googleusercontent.com/proxy/S4QPxKJd-oK_9QzSZmteyfK06UZRSIgiC3irRo7ZaVi7J9AWX1gfqm5rIbGe9JDlr7J-f5PfJR0Ieg5uO1RRp0Hc1G4u5Zxlm9SSVw=w3840-h2160-p-k-no-nd-mv'
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

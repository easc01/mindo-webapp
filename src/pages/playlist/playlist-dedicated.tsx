import MainWrapper from '@/components/common/main-wrapper'
import { Search } from 'lucide-react'
import {
  PlaylistBanner,
  PlaylistGrid,
  PlaylistTopic,
} from '@/components/playlist/playlist'
import { usePlaylistByIdQuery } from '@/services/playlist'
import { useParams } from 'react-router-dom'
import { timeAgo } from '@/lib/utils'

const PlaylistDedicatedPage: React.FC = () => {
  const { playlistId } = useParams()
  const { data } = usePlaylistByIdQuery(playlistId ?? '')

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
            <div className='mb-4 flex items-center justify-between'>
              <h2 className='text-xl font-bold'>Lesson Plan</h2>
              <Search />
            </div>

            <PlaylistGrid>
              {data.data.topics.map((topic, i) => (
                <PlaylistTopic
                  key={i}
                  topicId={topic.id}
                  topicName={topic.name}
                  topicNumber={i + 1}
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

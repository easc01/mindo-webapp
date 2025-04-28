import MainWrapper from '@/components/common/main-wrapper'
import {
  PlaylistMainHeader,
  PlaylistPreview,
  PlaylistSection,
} from '@/components/playlist/playlist'
import { timeAgo } from '@/lib/utils'
import { usePlaylistQuery } from '@/services/playlist'

const PlaylistMainPage: React.FC = () => {
  const { data } = usePlaylistQuery()

  if (data) {
    return (
      <MainWrapper>
        <PlaylistMainHeader />
        <PlaylistSection className='p-8'>
          {data.data.map((playlist) => (
            <PlaylistPreview
              key={playlist.id}
              topicsCount={playlist.topicsCount}
              playlistId={playlist.id}
              title={playlist.name}
              views={playlist.views}
              thumbnailUrl='https://i.ytimg.com/vi/c3Cn4xYfxJY/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLDSMcUYcLhdjSoAsBTFjoztuUSLGg'
              uploadDate={timeAgo(playlist.createdAt)}
            />
          ))}
        </PlaylistSection>
      </MainWrapper>
    )
  }
}

export default PlaylistMainPage

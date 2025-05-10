import MainWrapper from '@/components/common/main-wrapper'
import {
  PlaylistMainHeader,
  PlaylistPreview,
  PlaylistSection,
} from '@/components/playlist/playlist'
import useDebounce from '@/hooks/use-debounce'
import { timeAgo } from '@/lib/utils'
import { usePlaylistQuery } from '@/services/playlist'
import { useState } from 'react'

interface PlaylistContentProps {
  playlistQuery: string
}

const PlaylistsContent: React.FC<PlaylistContentProps> = ({
  playlistQuery,
}) => {
  const debouncedQuery = useDebounce(playlistQuery, 500)
  const { data } = usePlaylistQuery(debouncedQuery)

  return (
    <PlaylistSection className='p-8'>
      {data?.data.map((playlist) => (
        <PlaylistPreview
          key={playlist.id}
          topicsCount={playlist.topicsCount}
          playlistId={playlist.id}
          title={playlist.name}
          views={playlist.views}
          thumbnailUrl={''}
          uploadDate={timeAgo(playlist.createdAt)}
        />
      ))}
    </PlaylistSection>
  )
}

const PlaylistMainPage: React.FC = () => {
  const [playlistQuery, setPlaylistQuery] = useState<string>('')

  const onPlaylistQueryChange = (s: string) => {
    setPlaylistQuery(s)
  }

  return (
    <MainWrapper>
      <PlaylistMainHeader
        searchTag={playlistQuery}
        onSearchTagChange={onPlaylistQueryChange}
      />
      <PlaylistsContent playlistQuery={playlistQuery} />
    </MainWrapper>
  )
}

export default PlaylistMainPage

import MainWrapper from '@/components/common/main-wrapper'
import {
  PlaylistMainHeader,
  PlaylistPreview,
  PlaylistSection,
} from '@/components/playlist/playlist'
import { Button } from '@/components/ui/button'
import useDebounce from '@/hooks/use-debounce'
import { cn, timeAgo } from '@/lib/utils'
import ROUTES from '@/navigation/routes'
import { usePlaylistQuery } from '@/services/playlist'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface PlaylistContentProps {
  playlistQuery: string
}

const PlaylistsContent: React.FC<PlaylistContentProps> = ({
  playlistQuery,
}) => {
  const navigate = useNavigate()
  const debouncedQuery = useDebounce(playlistQuery, 500)
  const { data } = usePlaylistQuery(debouncedQuery)

  const handleRouteToGenAI = () => {
    navigate(ROUTES.PLAYLIST.LOAD_PLAYLIST(debouncedQuery))
  }

  return (
    <PlaylistSection className='relative size-full p-8'>
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

      {data && debouncedQuery && (
        <div
          className={cn(
            data?.data.length > 0
              ? 'w-full pb-20 text-center'
              : 'absolute inset-0 flex size-full items-center justify-center'
          )}
        >
          <div className='text-center'>
            {data.data.length === 0 && (
              <p className='mb-2 text-4xl'>No results</p>
            )}
            <p className='mb-4'>Couldn't find what you were looking for?</p>
            <Button
              onClick={handleRouteToGenAI}
              className='hover:bg-app-dark-1'
            >
              Try using AI
            </Button>
          </div>
        </div>
      )}
    </PlaylistSection>
  )
}

const PlaylistMainPage: React.FC = () => {
  const [playlistQuery, setPlaylistQuery] = useState<string>('')

  const onPlaylistQueryChange = (s: string) => {
    setPlaylistQuery(s)
  }

  return (
    <MainWrapper className='flex flex-col'>
      <PlaylistMainHeader
        searchTag={playlistQuery}
        onSearchTagChange={onPlaylistQueryChange}
      />
      <PlaylistsContent playlistQuery={playlistQuery} />
    </MainWrapper>
  )
}

export default PlaylistMainPage

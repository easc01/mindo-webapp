import { ListVideo, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { PlaylistPreviewProps, PlaylistSectionProps } from './playlist-types'
import { Skeleton } from '@/components/ui/skeleton'

const PlaylistSearchBar: React.FC = () => {
  return (
    <div className='flex'>
      <Input
        placeholder='What would you like to study?'
        className='bg-app-dark-1 border-app-dark-2 h-10 rounded-l-3xl rounded-r-none border-2'
      />
      <Button className='hover:bg-app-dark-2 h-10 w-16 rounded-l-none rounded-r-3xl'>
        <Search className='stroke-app-dark-0 size-6 stroke-2' />
      </Button>
    </div>
  )
}

const PlaylistSection: React.FC<PlaylistSectionProps> = ({
  scrollDirection = 'none',
  children,
}) => (
  <div
    className={cn('mx-4 flex h-[90%] gap-6 overflow-y-scroll rounded-md py-4', {
      'my-4 flex-row': scrollDirection === 'horizontal',
      'flex-col': scrollDirection === 'vertical',
      'flex-wrap': scrollDirection === 'none',
    })}
  >
    {children}
  </div>
)

const PlaylistPreview: React.FC<PlaylistPreviewProps> = ({
  playlistId,
  thumbnailUrl,
  title,
  uploadDate,
  views,
  topicsCount,
}) => {
  return (
    <div key={playlistId} className='w-[370px]'>
      <div
        style={{
          backgroundImage: `url('${thumbnailUrl}')`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
        className='bg-app-dark-2 relative mb-2 h-[209px] w-[370px] overflow-hidden rounded-md'
      >
        <div className='absolute inset-y-0 right-0 flex w-2/5 flex-col items-center justify-center gap-1 bg-black/90'>
          <ListVideo className='size-5' />
          <p className='text-sm'>{topicsCount} Topics</p>
        </div>
      </div>

      <div className='flex items-start gap-2'>
        <span className='mt-1'>
          <Skeleton className='size-10 rounded-full' />
        </span>

        <div>
          <p className='line-clamp-2'>{title}</p>
          <span className='flex items-center gap-2 text-sm'>
            <p>{views} views - {uploadDate}</p>
          </span>
        </div>
      </div>
    </div>
  )
}

const PlaylistMainHeader: React.FC = () => (
  <div className='p-4 backdrop-blur-lg'>
    <PlaylistSearchBar />
  </div>
)

const PlaylistMainPage: React.FC = () => {
  return (
    <div className='size-full h-dvh overflow-hidden'>
      <PlaylistMainHeader />

      <PlaylistSection>
        {Array.from({ length: 19 }).map((_, idx) => (
          <PlaylistPreview
            topicsCount={49}
            playlistId={String(idx)}
            key={idx}
            title='Top 10 useful libraries for JavaScript | freeCodeCamp'
            views={400000}
            thumbnailUrl='https://i.ytimg.com/vi/c3Cn4xYfxJY/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLDSMcUYcLhdjSoAsBTFjoztuUSLGg'
            uploadDate='10 months ago'
          />
        ))}
      </PlaylistSection>
    </div>
  )
}

export default PlaylistMainPage

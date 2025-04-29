import { cn, trimCount } from '@/lib/utils'
import ROUTES from '@/navigation/routes'
import {
  LessonNotesProps,
  PlaylistBannerProps,
  PlaylistPreviewProps,
  PlaylistSectionProps,
  PlaylistTopicProps,
  PlaylistVideoLabelsProps,
} from '@/pages/playlist/playlist-types'
import { useNavigate, useParams } from 'react-router-dom'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ChevronDown, ListVideo, RotateCcw, Search } from 'lucide-react'

const PlaylistTopic: React.FC<PlaylistTopicProps> = ({
  topicId,
  topicName,
  topicNumber,
  videoId,
}) => {
  const navigate = useNavigate()
  const { playlistId } = useParams()

  const onTopicClick = () => {
    if (videoId) {
      navigate(ROUTES.PLAYLIST.VIDEO(playlistId, topicId, videoId))
    } else {
      navigate(ROUTES.PLAYLIST.LOAD_VIDEOS(playlistId, topicId))
    }
  }

  return (
    <div
      onClick={onTopicClick}
      className='hover:bg-app-dark-1 border-app-dark-1 min-h-10 w-full cursor-pointer rounded-md border-2 p-2'
    >
      {topicNumber}. {topicName}
    </div>
  )
}

const PlaylistBanner: React.FC<PlaylistBannerProps> = ({
  bannerUrl,
  name,
  playlistCode,
  views,
  uploadDate,
}) => (
  <div
    style={{
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundImage: `url('${bannerUrl}')`,
    }}
    className='relative z-0 h-56 w-full px-8 py-4'
  >
    <div className='absolute inset-0 z-10 bg-black/50' />
    <div className='relative z-20 flex h-full items-end justify-between'>
      <h1 className='text-3xl font-bold'>
        {name} - {playlistCode}
      </h1>
      <p>
        {trimCount(views)} watchers - {uploadDate}
      </p>
    </div>
  </div>
)

const PlaylistGrid: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <div className='grid grid-cols-1 gap-3 md:grid-cols-3'>{children}</div>

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
  className,
}) => (
  <div
    className={cn(
      'flex gap-6 rounded-md py-4',
      {
        'w-full flex-row overflow-x-auto': scrollDirection === 'horizontal',
        'h-full flex-col overflow-y-auto': scrollDirection === 'vertical',
        'justfiy-center flex-wrap items-center': scrollDirection === 'none',
      },
      className
    )}
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
  const navigate = useNavigate()

  const onPlaylistClick = () => {
    navigate(ROUTES.PLAYLIST.PLAYLIST(playlistId))
  }

  return (
    <div
      onClick={onPlaylistClick}
      key={playlistId}
      className='w-[370px] cursor-pointer'
    >
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
        {/* <span className='mt-1'>
          <Skeleton className='size-10 rounded-full' />
        </span> */}

        <PlaylistVideoLabels
          title={title}
          uploadDate={uploadDate}
          views={views}
        />
      </div>
    </div>
  )
}

const PlaylistVideoLabels: React.FC<PlaylistVideoLabelsProps> = ({
  title,
  views,
  uploadDate,
  classNames,
}) => (
  <div className={classNames?.component}>
    <p className={cn('line-clamp-2', classNames?.title)}>{title}</p>
    <span
      className={cn('flex items-center gap-2 text-sm', classNames?.subLabels)}
    >
      <p>
        {trimCount(views) ?? 0} views - {uploadDate}
      </p>
    </span>
  </div>
)

const PlaylistMainHeader: React.FC = () => (
  <div className='sticky top-0 z-50 w-full p-4 backdrop-blur-lg'>
    <PlaylistSearchBar />
  </div>
)

const LessonNotes: React.FC<LessonNotesProps> = ({ lessonName }) => (
  <div className='flex h-40 flex-col'>
    <div className='flex items-center justify-between text-xl font-bold'>
      <h3>Lesson Notes - {lessonName}</h3>

      <div className='flex items-center gap-2'>
        <RotateCcw className='cursor-pointer' />
        <ChevronDown className='size-10 cursor-pointer' />
      </div>
    </div>

    <div className='flex flex-1 items-center justify-center'>
      <p>AI notes generation coming soon!</p>
    </div>
  </div>
)

export {
  PlaylistBanner,
  PlaylistTopic,
  PlaylistGrid,
  PlaylistSearchBar,
  PlaylistSection,
  PlaylistPreview,
  PlaylistVideoLabels,
  PlaylistMainHeader,
  LessonNotes,
}

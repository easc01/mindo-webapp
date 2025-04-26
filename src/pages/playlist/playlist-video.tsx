import MainWrapper from '@/components/common/main-wrapper'
import VideoPlayer from '@/components/common/video-player'
import Bar from '@/components/common/bar'
import {
  LessonNotes,
  PlaylistPreview,
  PlaylistSection,
  PlaylistVideoLabels,
} from '@/components/playlist/playlist'
import { useEffect } from 'react'

const PlaylistVideoPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'instant',
    })
  })

  return (
    <MainWrapper className='flex h-full flex-col gap-6 overflow-y-auto p-8'>
      <VideoPlayer url='https://www.youtube.com/watch?v=b7YgXassC3c' />

      <PlaylistVideoLabels
        title='1. Top 10 useful libraries for JavaScript | freeCodeCamp'
        uploadDate='10 months ago'
        views={400000}
        classNames={{
          component: 'flex flex-col gap-2',
          title: 'text-xl font-bold',
          subLabels: 'text-base ',
        }}
      />

      <Bar />
      <LessonNotes lessonName='Top 10 useful libraries for JavaScript | freeCodeCamp' />
      <Bar />

      <h3 className='text-xl font-bold'>You might also like</h3>

      <PlaylistSection scrollDirection='horizontal'>
        {Array.from({ length: 8 }).map((_, idx) => (
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
    </MainWrapper>
  )
}

export default PlaylistVideoPage

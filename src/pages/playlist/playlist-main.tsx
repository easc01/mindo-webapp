import MainWrapper from '@/components/common/main-wrapper'
import {
  PlaylistMainHeader,
  PlaylistPreview,
  PlaylistSection,
} from '@/components/playlist/playlist'

const PlaylistMainPage: React.FC = () => {
  return (
    <MainWrapper>
      <PlaylistMainHeader />
      <PlaylistSection className='p-8'>
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
    </MainWrapper>
  )
}

export default PlaylistMainPage

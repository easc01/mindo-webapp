import MainWrapper from '@/components/common/main-wrapper'
import { Search } from 'lucide-react'
import { PlaylistBanner, PlaylistGrid, PlaylistTopic } from '@/components/playlist/playlist'

const PlaylistDedicatedPage: React.FC = () => {
  return (
    <MainWrapper className='overflow-auto'>
      <PlaylistBanner
        name='Java programming'
        playlistCode='HXL150'
        views={400000}
        uploadDate='10 months ago'
        bannerUrl='https://lh3.googleusercontent.com/proxy/S4QPxKJd-oK_9QzSZmteyfK06UZRSIgiC3irRo7ZaVi7J9AWX1gfqm5rIbGe9JDlr7J-f5PfJR0Ieg5uO1RRp0Hc1G4u5Zxlm9SSVw=w3840-h2160-p-k-no-nd-mv'
      />

      <div className='w-full p-8'>
        <p>
          Java is a high-level, general-purpose, object-oriented programming
          language. It was designed to "write once, run anywhere," meaning that
          compiled Java code can run on all platforms supporting Java without
          recompilation. It's widely used for developing web and mobile
          applications, enterprise software, and more. Java is a high-level,
          general-purpose, object-oriented programming language. It was designed
          to "write once, run anywhere," meaning that compiled Java code can run
          on all platforms supporting Java without recompilation. It's widely
          used for developing web and mobile applications, enterprise software,
          and more. 
        </p>

        <div className='mt-8'>
          <div className='mb-4 flex items-center justify-between'>
            <h2 className='text-xl font-bold'>Lesson Plan</h2>
            <Search />
          </div>

          <PlaylistGrid>
            {Array.from({ length: 30 }).map((_, i) => (
              <PlaylistTopic key={i} id={String(i + 1)} />
            ))}
          </PlaylistGrid>
        </div>
      </div>
    </MainWrapper>
  )
}

export default PlaylistDedicatedPage

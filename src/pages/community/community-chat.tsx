import MainWrapper from '@/components/common/main-wrapper'
import { MessageWindow } from '@/components/community/chat'
import { useParams } from 'react-router-dom'

const CommunityChat: React.FC = () => {
  const { communityId } = useParams()

  return (
    <MainWrapper className='h-screen overflow-hidden py-2 pl-2'>
      <MessageWindow communityId={communityId!} />
      <div className='bg-app-dark-1 absolute top-2 left-2 h-14 w-[calc(100%-1.5rem)] rounded-md'></div>
      <div className='bg-app-dark-1 absolute bottom-2 left-2 h-14 w-[calc(100%-1.5rem)] rounded-md'></div>
    </MainWrapper>
  )
}

export default CommunityChat

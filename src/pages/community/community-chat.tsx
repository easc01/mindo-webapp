import MainWrapper from '@/components/common/main-wrapper'
import { MessageWindow } from '@/components/community/chat'
import { useParams } from 'react-router-dom'

const CommunityChat: React.FC = () => {
  const { communityId } = useParams()

  return (
    <MainWrapper className='h-screen overflow-hidden py-2 pl-2'>
      <MessageWindow communityId={communityId!} />
    </MainWrapper>
  )
}

export default CommunityChat

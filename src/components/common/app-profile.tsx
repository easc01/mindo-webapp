import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn, getInitials } from '@/lib/utils'

interface AppProfileProps {
  username?: string
  name?: string
  profileUrl?: string
  className?: string
}

const AppProfile: React.FC<AppProfileProps> = ({
  username = '',
  name = '',
  profileUrl = '',
  className = '',
}) => {
  return (
    <Avatar className={cn('size-10', className)}>
      <AvatarImage src={profileUrl} alt={`@${username}`} />
      <AvatarFallback className='bg-black'>{getInitials(name)}</AvatarFallback>
    </Avatar>
  )
}

export default AppProfile

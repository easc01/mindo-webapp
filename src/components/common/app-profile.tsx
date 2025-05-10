import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn, getInitials } from '@/lib/utils'

interface AppProfileProps {
  username?: string
  name?: string
  profileUrl?: string
  className?: string
  color?: string
}

const AppProfile: React.FC<AppProfileProps> = ({
  username = '',
  name = '',
  profileUrl = '',
  className = '',
  color = 'black',
}) => {
  return (
    <Avatar className={cn('size-10', className)}>
      <AvatarImage src={profileUrl} alt={`@${username}`} />
      <AvatarFallback
        style={{
          backgroundColor: color,
        }}
      >
        {getInitials(name)}
      </AvatarFallback>
    </Avatar>
  )
}

export default AppProfile

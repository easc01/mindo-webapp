import AppProfile from '@/components/common/app-profile'
import { cn } from '@/lib/utils'
import { useNavigate } from 'react-router-dom'
import { useMessageHistory } from '@/services/community'
import { useAppSelector } from '@/hooks/redux'
import { useEffect } from 'react'
import { toast } from 'sonner'
import { MessageGroupProps, MessageWindowProps } from './community-types'

const MessageGroup: React.FC<MessageGroupProps> = ({
  currentUserId,
  data: { userId, username, userProfilePic, name, messages },
}) => {
  const isCurrentUser = userId === currentUserId

  return (
    <div
      className={cn(
        'flex items-end gap-4 text-sm',
        isCurrentUser ? 'justify-end' : 'justify-start'
      )}
    >
      {!isCurrentUser && (
        <AppProfile
          name={name}
          username={username}
          profileUrl={userProfilePic}
        />
      )}

      <div
        className={cn(
          'flex flex-col gap-0.5',
          isCurrentUser ? 'items-end' : 'items-start'
        )}
      >
        {messages.map((message, i) => {
          const isFirst = i === 0
          const isLast = i === messages.length - 1

          return (
            <div
              key={i}
              className={cn(
                'bg-app-dark-1 relative max-w-96 rounded-sm px-3 py-2',
                {
                  'rounded-t-lg': isFirst,
                  'rounded-b-lg': isLast,
                }
              )}
            >
              {!isCurrentUser && isFirst && (
                <p className='mb-1 text-xs font-semibold'>{name}</p>
              )}
              <p>{message.content}</p>

              {isLast && (
                <div
                  className={cn(
                    'absolute bottom-2.5 h-0 w-0 border-t-8 border-b-8 border-t-transparent border-b-transparent',
                    isCurrentUser
                      ? 'border-l-app-dark-1 -right-2 border-l-10'
                      : 'border-r-app-dark-1 -left-2 border-r-10'
                  )}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

const MessageWindow: React.FC<MessageWindowProps> = ({ communityId }) => {
  const navigate = useNavigate()
  const { data, error, isLoading } = useMessageHistory(communityId)
  const { userId } = useAppSelector((state) => state.userData)

  useEffect(() => {
    if (error) {
      toast(error.message)
      navigate(-1)
    }
  }, [error])

  if (isLoading) {
    return <>...loading</>
  }

  if (data) {
    const groupedMessages = data.data

    return (
      <div className='flex size-full flex-col-reverse gap-2 overflow-y-auto pt-16 pr-6 pb-16'>
        {groupedMessages.map((group) => (
          <MessageGroup currentUserId={userId} data={group} />
        ))}
      </div>
    )
  }
}

export { MessageGroup, MessageWindow }

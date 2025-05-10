import AppProfile from '@/components/common/app-profile'
import { cn, formatTimestamp } from '@/lib/utils'
import { useNavigate } from 'react-router-dom'
import { useMessageHistory } from '@/services/community'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner'
import {
  MessageGroupProps,
  MessageInputProps,
  MessageWindowProps,
} from './community-types'
import { Input } from '../ui/input'
import { SendHorizontal } from 'lucide-react'
import { updateMessageInputByCommunity } from '@/store/chat-ui-slice'
import { ACCESS_TOKEN_KEY } from '@/lib/constants'
import { MessageGroupType } from '@/types/community'
import { SocketMessage } from '@/types/common'
import connectSocket from '@/services/socket'
import { appConfig } from '@/lib/config'

const MessageGroup: React.FC<MessageGroupProps> = ({
  currentUserId,
  data: { userId, username, userProfilePic, name, messages, userColor },
}) => {
  const isCurrentUser = userId === currentUserId

  return (
    <div className='flex flex-col gap-2'>
      <p className='w-full text-center text-xs'>
        {formatTimestamp(messages?.[0]?.timestamp)}
      </p>
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
            color={userColor}
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
                  <p
                    style={{
                      color: userColor,
                    }}
                    className='mb-1 text-xs font-semibold'
                  >
                    {name}
                  </p>
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
    </div>
  )
}

const MessageWindow: React.FC<MessageWindowProps> = ({ communityId }) => {
  const twoMinutes = 2 * 60 * 1000

  const navigate = useNavigate()
  const { userId } = useAppSelector((state) => state.userData)
  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY)
  const { data, error, isLoading } = useMessageHistory(communityId)
  const [allMessages, setAllMessages] = useState<MessageGroupType[]>([])

  const [sendMessageFn, setSendMessageFn] = useState<(message: any) => void>(
    () => () => {}
  )

  useEffect(() => {
    if (error) {
      toast(error.message)
      navigate(-1)
    }
  }, [error, navigate])

  useEffect(() => {
    if (!communityId || !accessToken) return

    const socket = connectSocket({
      url: `${appConfig.wsBaseUrl}/chat?communityId=${communityId}&auth=${accessToken}`,
      onOpen: () => console.log('WebSocket connected', communityId),
      onClose: () => console.log('WebSocket disconnected', communityId),
      onError: (error) => console.error('WebSocket error:', error),
      onMessage: (event: MessageEvent<string>) => {
        const data = JSON.parse(event.data) as SocketMessage

        setAllMessages((prevMessages) => {
          const updatedMessages = [...prevMessages]
          if (updatedMessages.length > 0) {
            const lastMessageGrp = updatedMessages[0]
            const isSameUserAsLast = lastMessageGrp.userId === data.userId
            const isWithinTwoMins =
              Math.abs(
                new Date(
                  lastMessageGrp.messages[
                    lastMessageGrp.messages.length - 1
                  ].timestamp
                ).getTime() - new Date(data.timestamp).getTime()
              ) <= twoMinutes

            if (isSameUserAsLast && isWithinTwoMins) {
              const updatedGroup = {
                ...lastMessageGrp,
                messages: [
                  ...lastMessageGrp.messages,
                  {
                    content: data.content,
                    timestamp: data.timestamp,
                    id: data.messageId,
                  },
                ],
              }
              // Replace the first element with the updated group
              updatedMessages[0] = updatedGroup
            } else {
              const newEntry: MessageGroupType = {
                messageGroupId: data.messageGroupId,
                userId: data.userId,
                name: data.name,
                username: data.username,
                userProfilePic: data.userProfilePic,
                userColor: data.userColor,
                messages: [
                  {
                    content: data.content,
                    timestamp: data.timestamp,
                    id: data.messageId,
                  },
                ],
              }

              // Add new message group at the beginning
              updatedMessages.unshift(newEntry)
            }
          } else {
            // If there are no messages yet, add the first message group
            updatedMessages.unshift({
              messageGroupId: data.messageGroupId,
              userId: data.userId,
              name: data.name,
              username: data.username,
              userProfilePic: data.userProfilePic,
              userColor: data.userColor,
              messages: [
                {
                  content: data.content,
                  timestamp: data.timestamp,
                  id: data.messageId,
                },
              ],
            })
          }
          return updatedMessages
        })
      },
    })

    // Define send message function
    const sendMessage = (message: any) => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(message)
      } else {
        toast('Connection failed')
      }
    }

    setSendMessageFn(() => sendMessage)

    return () => {
      socket.close()
    }
  }, [communityId, accessToken])

  useEffect(() => {
    if (data) {
      setAllMessages(data.data)
    }
  }, [data])

  if (isLoading) {
    return <>...loading</>
  }

  if (data) {
    return (
      <>
        {/* <div className='bg-app-dark-1 absolute top-2 left-2 z-50 h-14 w-[calc(100%-1.5rem)] rounded-md'></div> */}
        <div className='flex size-full flex-col-reverse gap-2 overflow-y-auto pr-6 pb-16'>
          {allMessages.map((group) => (
            <MessageGroup
              key={group.messageGroupId}
              currentUserId={userId}
              data={group}
            />
          ))}
        </div>
        <MessageInput
          communityId={communityId!}
          onSendMessage={sendMessageFn}
        />
      </>
    )
  }

  return null
}

const MessageInput: React.FC<MessageInputProps> = ({
  communityId,
  onSendMessage,
}) => {
  const dispatch = useAppDispatch()

  const { messageInputMap } = useAppSelector((state) => state.chatUI)

  const messageValue = useMemo(
    () => messageInputMap[communityId] ?? '',
    [messageInputMap, communityId]
  )

  const handleOnChange = useCallback(
    (message: string) => {
      dispatch(
        updateMessageInputByCommunity({
          communityId,
          message,
        })
      )
    },
    [communityId]
  )

  const onEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage()
    }
  }

  const handleSendMessage = () => {
    if (!messageValue.trim()) return
    onSendMessage(messageValue)
    dispatch(updateMessageInputByCommunity({ communityId, message: '' }))
  }

  return (
    <div className='bg-app-dark-1 absolute bottom-2 left-2 h-12 w-[calc(100%-1.5rem)] rounded-md'>
      <Input
        value={messageValue}
        onChange={(e) => handleOnChange(e.target.value)}
        onKeyDown={onEnterPress}
        placeholder='Write a message...'
        className='bg-app-dark-1 border-app-dark-2 h-full border-2'
      />
      <SendHorizontal
        onClick={handleSendMessage}
        className='stroke-ring absolute top-1/2 right-4 size-5 -translate-y-1/2 stroke-2'
      />
    </div>
  )
}

export { MessageGroup, MessageWindow, MessageInput }

import { ConnectSocketParams } from '@/types/common'

const connectSocket = ({
  url,
  onOpen,
  onMessage,
  onClose,
  onError,
}: ConnectSocketParams) => {
  const socket = new WebSocket(url)

  socket.onopen = (e) => onOpen?.(e)
  socket.onmessage = (event) => onMessage?.(event)
  socket.onclose = (e) => onClose?.(e)
  socket.onerror = (err) => onError?.(err)

  return socket
}

export default connectSocket

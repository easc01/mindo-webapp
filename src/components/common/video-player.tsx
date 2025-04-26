import React from 'react'
import ReactPlayer from 'react-player'

interface VideoPlayerProps {
  url: string
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url }) => {
  return (
    <div className='h-[500px] overflow-hidden rounded-xl'>
      <ReactPlayer
        playing={true}
        url={url}
        controls
        width='100%'
        height='100%'
      />
    </div>
  )
}

export default VideoPlayer

interface PlaylistPreviewType {
  id: string
  name: string
  description: string
  interestId: string
  thumbnailUrl: string
  views: number
  code: string
  createdAt: Date
  updatedAt: Date
  updatedBy: string
  topicsCount: number
}

interface PlaylistData {
  id: string
  name: string
  description: string
  interestId: string
  thumbnailUrl: string
  views: number
  code: string
  createdAt: Date
  isAIGen: boolean
  updatedAt: Date
  updatedBy: string
  topics: TopicMini[]
}

interface TopicMini {
  id: string
  name: string
  videoId: string
  topicNumber: number
}

interface VideoData {
  id: string
  topicId: string
  videoId: string
  title: string
  videoPublishedAt: Date
  channelTitle: string
  thumbnailUrl: string
  expiryAt: Date
  createdAt: Date
  updatedAt: Date
  updatedBy: string
}

interface GroupedVideosResponse {
  video: VideoData
  moreVideos: VideoData[]
}

interface PlaylistUIState {}

export type {
  PlaylistUIState,
  PlaylistPreviewType,
  TopicMini,
  PlaylistData,
  VideoData,
  GroupedVideosResponse,
}

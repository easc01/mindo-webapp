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
  updatedAt: Date
  updatedBy: string
  topics: TopicMini[]
}

interface TopicMini {
  id: string
  name: string
}

export type { PlaylistPreviewType, TopicMini, PlaylistData }

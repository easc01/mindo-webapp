import { ClassNames } from '@/types/common'
import { VideoData } from '@/types/playlist'

interface PlaylistSectionProps {
  scrollDirection?: 'vertical' | 'horizontal' | 'none'
  children: React.ReactNode
  className?: string
}

interface PlaylistTopicProps {
  topicId: string
  topicName: string
  topicNumber: number
  videoId: string
}

interface PlaylistTopicsHeaderProps {
  searchTag: string
  onSearchTagChange: (s: string) => void
  onSearch?: () => void
}

interface PlaylistPreviewProps {
  playlistId: string
  title: string
  views: number
  uploadDate: string
  thumbnailUrl: string
  topicsCount: number
}

interface VideoPreviewProps {
  playlistId: string
  video: VideoData
}

interface PlaylistBannerProps {
  bannerUrl: string
  name: string
  playlistCode: string
  views: number
  uploadDate: string
}

interface PlaylistVideoLabelsClassNames extends ClassNames {
  title?: string
  subLabels?: string
}

interface PlaylistPreviewLabelsProps {
  title: string
  views: number
  uploadDate: string
  classNames?: PlaylistVideoLabelsClassNames
}

interface VideoPreviewLabelsProps {
  title: string
  channelName: string
  uploadDate: string
  classNames?: PlaylistVideoLabelsClassNames
}

interface LessonNotesProps {
  lessonName: string
}

interface SearchTagProps {
  searchTag: string
  onSearchTagChange: (s: string) => void
}

export type {
  PlaylistTopicProps,
  PlaylistSectionProps,
  PlaylistPreviewProps,
  PlaylistBannerProps,
  PlaylistPreviewLabelsProps,
  LessonNotesProps,
  PlaylistTopicsHeaderProps,
  VideoPreviewProps,
  VideoPreviewLabelsProps,
  SearchTagProps,
}

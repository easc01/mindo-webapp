import { ClassNames } from '@/types/common'

interface PlaylistSectionProps {
  scrollDirection?: 'vertical' | 'horizontal' | 'none'
  children: React.ReactNode
  className?: string
}

interface PlaylistTopicProps {
  topicId: string
  topicName: string
  topicNumber: number
}

interface PlaylistPreviewProps {
  playlistId: string
  title: string
  views: number
  uploadDate: string
  thumbnailUrl: string
  topicsCount: number
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

interface PlaylistVideoLabelsProps {
  title: string
  views: number
  uploadDate: string
  classNames?: PlaylistVideoLabelsClassNames
}

interface LessonNotesProps {
  lessonName: string
}

export type {
  PlaylistTopicProps,
  PlaylistSectionProps,
  PlaylistPreviewProps,
  PlaylistBannerProps,
  PlaylistVideoLabelsProps,
  LessonNotesProps,
}

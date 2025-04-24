interface PlaylistSectionProps {
  scrollDirection?: 'vertical' | 'horizontal' | 'none'
  children: React.ReactNode
}

interface PlaylistPreviewProps {
  playlistId: string
  title: string
  views: number
  uploadDate: string
  thumbnailUrl: string
  topicsCount: number
}

export type { PlaylistSectionProps, PlaylistPreviewProps }

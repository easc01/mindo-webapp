import { CommunityType } from './community'
import { PlaylistPreviewType } from './playlist'

interface UserDataType {
  accessToken: string
  userId: string
  userType: string
  username: string
  profilePictureUrl: string
  oauthClientId: string
  color: string
  bio: string
  name: string
  mobile: string
  email: string
  lastLoginAt: string
  joinedCommunities: CommunityType[]
  recentPlaylists: PlaylistPreviewType[]
  updatedAt: string
  createdAt: string
  updatedBy: string
}

export type { UserDataType }

import { CommunityType } from './community'

interface UserDataType {
  accessToken: string
  userId: string
  userType: string
  username: string
  profilePictureUrl: string
  oauthClientId: string
  bio: string
  name: string
  mobile: string
  email: string
  lastLoginAt: string
  joinedCommunities: CommunityType[]
  updatedAt: string
  createdAt: string
  updatedBy: string
}

export type { UserDataType }

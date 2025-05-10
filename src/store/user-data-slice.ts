import { UserDataType } from '@/types/user'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: UserDataType = {
  accessToken: '',
  userId: '',
  userType: '',
  username: '',
  profilePictureUrl: '',
  oauthClientId: '',
  bio: '',
  name: '',
  color: 'yellow',
  mobile: '',
  email: '',
  lastLoginAt: '',
  joinedCommunities: [],
  recentPlaylists: [],
  updatedAt: '',
  createdAt: '',
  updatedBy: '',
}

const userDataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    resetUserData: () => initialState,
    updateUserData: (
      state,
      { payload }: PayloadAction<Partial<UserDataType>>
    ) => ({
      ...state,
      ...payload,
    }),
  },
})

export const { resetUserData, updateUserData } = userDataSlice.actions
export default userDataSlice.reducer

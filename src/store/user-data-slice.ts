import { UserData } from '@/types/user'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: UserData = {
  accessToken: '',
  userId: '',
  userType: '',
  username: '',
  profilePictureUrl: '',
  oauthClientId: '',
  bio: '',
  name: '',
  mobile: '',
  email: '',
  lastLoginAt: '',
  updatedAt: '',
  createdAt: '',
  updatedBy: '',
}

const userDataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    resetUserData: () => initialState,
    updateUserData: (state, { payload }: PayloadAction<Partial<UserData>>) => ({
      ...state,
      ...payload,
    }),
  },
})

export const { resetUserData, updateUserData } = userDataSlice.actions
export default userDataSlice.reducer

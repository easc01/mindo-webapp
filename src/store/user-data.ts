import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IUserData {}

const initialState: IUserData = {}

const userDataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    updateUserData: (
      state,
      { payload }: PayloadAction<Partial<IUserData>>
    ) => ({
      ...state,
      ...payload,
    }),
  },
})

export const { updateUserData } = userDataSlice.actions
export default userDataSlice.reducer

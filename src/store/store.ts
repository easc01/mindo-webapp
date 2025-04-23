import { configureStore } from '@reduxjs/toolkit'

import userDataSlice from './user-data-slice'
import appDialogSlice from './app-dialog-slice'

export const store = configureStore({
  reducer: {
    userData: userDataSlice,
    appDialog: appDialogSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

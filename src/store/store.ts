import { configureStore } from '@reduxjs/toolkit'

import userDataSlice from './user-data-slice'
import chatUISlice from './chat-ui-slice'

export const store = configureStore({
  reducer: {
    userData: userDataSlice,
    chatUI: chatUISlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

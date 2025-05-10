import { ChatUIState } from '@/types/community'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UpdateMessageInputParams {
  communityId: string
  message: string
}

const initialState: ChatUIState = {
  messageInputMap: {},
}

const chatUISlice = createSlice({
  name: 'chatUISlice',
  initialState,
  reducers: {
    resetChatUI: () => initialState,
    updateMessageInputByCommunity: (
      state,
      { payload }: PayloadAction<UpdateMessageInputParams>
    ) => {
      const { communityId, message } = payload
      state.messageInputMap[communityId] = message
    },
    deleteMessageInputByCommunity: (
      state,
      { payload: communityId }: PayloadAction<string>
    ) => {
      delete state.messageInputMap[communityId]
    },
    updateChatUI: (
      state,
      { payload }: PayloadAction<Partial<ChatUIState>>
    ) => ({
      ...state,
      ...payload,
    }),
  },
})

export const {
  resetChatUI,
  updateMessageInputByCommunity,
  deleteMessageInputByCommunity,
  updateChatUI,
} = chatUISlice.actions
export default chatUISlice.reducer

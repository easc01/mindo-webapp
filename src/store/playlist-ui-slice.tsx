import { PlaylistUIState } from '@/types/playlist'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: PlaylistUIState = {
}

const playlistUISlice = createSlice({
  name: 'playlistUISlice',
  initialState,
  reducers: {
    resetPlaylistUI: () => initialState,
    updatePlaylistUI: (
      state,
      { payload }: PayloadAction<Partial<PlaylistUIState>>
    ) => ({
      ...state,
      ...payload,
    }),
  },
})

export const { resetPlaylistUI, updatePlaylistUI } = playlistUISlice.actions
export default playlistUISlice.reducer

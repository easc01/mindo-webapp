import { ActionEnum } from '@/lib/action-registry'
import { ContentEnum } from '@/lib/content-registry'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IAppDialog {
  isOpen: boolean
  allowClose?: boolean
  dialogContentType?: ContentEnum
  actionLabel?: string
  dialogActionType?: ActionEnum
}

const initialState: IAppDialog = {
  isOpen: false,
  allowClose: true,
  actionLabel: '',
  dialogContentType: undefined,
  dialogActionType: undefined,
}

const appDialogSlice = createSlice({
  name: 'appDialogSlice',
  initialState,
  reducers: {
    closeDialog: (state) => {
      setTimeout(() => {
        return initialState
      }, 1000)

      return {
        ...state,
        isOpen: false,
      }
    },
    openDialog: (
      state,
      { payload }: PayloadAction<Omit<IAppDialog, 'isOpen'>>
    ) => ({
      ...state,
      ...payload,
      isOpen: true,
    }),
  },
})

export const { closeDialog, openDialog } = appDialogSlice.actions
export default appDialogSlice.reducer

import {
  createContext,
  useState,
  type ReactNode,
  type FC,
  useContext,
} from 'react'

interface DialogState {
  isOpen: boolean
  content: ReactNode
  allowClose?: boolean
  action?: {
    label: string
    execute: () => void
  }
}

interface DialogContextType {
  dialog: DialogState
  openDialog: (props: Partial<Omit<DialogState, 'isOpen'>>) => void
  closeDialog: () => void
}

const defaultDialogState: DialogState = {
  isOpen: false,
  content: <></>,
  allowClose: true,
}

const DialogContext = createContext<DialogContextType>({
  dialog: defaultDialogState,
  openDialog: () => {},
  closeDialog: () => {},
})

const DialogProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [dialog, setDialog] = useState<DialogState>(defaultDialogState)

  const closeDialog = () => {
    setDialog((prev) => ({ ...prev, isOpen: false }))
    setTimeout(() => setDialog(defaultDialogState), 500)
  }

  const openDialog: DialogContextType['openDialog'] = ({
    content,
    allowClose = true,
    action,
  }) => {
    setDialog({ isOpen: true, content, allowClose, action })
  }

  return (
    <DialogContext.Provider value={{ dialog, openDialog, closeDialog }}>
      {children}
    </DialogContext.Provider>
  )
}

const useDialogContext = () => {
  const context = useContext(DialogContext)

  if (!context) {
    throw new Error('useDialogContext must be used within a DialogProvider')
  }

  return context
}

export { useDialogContext, DialogProvider }

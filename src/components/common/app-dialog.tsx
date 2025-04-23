import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { closeDialog } from '@/store/app-dialog-slice'
import contentMap from '@/lib/content-registry'
import actionMap from '@/lib/action-registry'

const AppDialog: React.FC = () => {
  const dispatch = useAppDispatch()
  const {
    isOpen,
    allowClose,
    actionLabel,
    dialogContentType,
    dialogActionType,
  } = useAppSelector((state) => state.appDialog)

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => allowClose && dispatch(closeDialog())}
    >
      <DialogContent
        showCloseButton={allowClose}
        className='bg-app-dark-1 w-max border-none text-white'
      >
        <DialogHeader className='hidden'>
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <main>{dialogContentType ? contentMap[dialogContentType] : <></>}</main>

        <DialogFooter>
          {actionLabel && dialogActionType && (
            <Button
              className='bg-app-dark-2 hover:bg-app-dark-0'
              onClick={actionMap[dialogActionType]}
            >
              {actionLabel}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AppDialog

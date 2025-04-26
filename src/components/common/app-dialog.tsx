import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useDialog } from '@/context/dialog-context'

const AppDialog: React.FC = () => {
const { dialog, closeDialog } = useDialog()
  const { isOpen, action, content, allowClose } = dialog

  return (
    <Dialog open={isOpen} onOpenChange={() => allowClose && closeDialog()}>
      <DialogContent
        showCloseButton={allowClose}
        className='bg-app-dark-1 w-max border-none text-white outline-none'
      >
        <DialogHeader className='hidden'>
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <main>{content}</main>

        <DialogFooter>
          {action && (
            <Button
              className='bg-app-dark-2 hover:bg-app-dark-0'
              onClick={action.execute}
            >
              {action.label}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AppDialog

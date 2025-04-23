import { SidebarTrigger } from '@/components/ui/sidebar'
import { useAppDispatch } from '@/hooks/redux'
import { ContentEnum } from '@/lib/content-registry'
import { openDialog } from '@/store/app-dialog-slice'

export default function LaunchScreen() {
  const dispatch = useAppDispatch()
  return (
    <>
      <SidebarTrigger />
      <button
        onClick={() =>
          dispatch(
            openDialog({
              allowClose: false,
              dialogContentType: ContentEnum.SIGN_IN,
            })
          )
        }
      >
        Launch screen
      </button>
    </>
  )
}

import { useEffect } from 'react'
import { useAppDispatch } from '@/hooks/redux'
import { openDialog } from '@/store/app-dialog-slice'
import { ContentEnum } from '@/lib/content-registry'

const SignInPage = () => {
  const dispatch = useAppDispatch()

  // trigger sign in dialog box
  useEffect(() => {
    dispatch(
      openDialog({
        allowClose: false,
        dialogContentType: ContentEnum.SIGN_IN,
      })
    )
  }, [])

  return <></>
}

export default SignInPage

import SignIn from '@/components/common/signin-dialog'
import { useDialogContext } from '@/context/dialog-context'
import { useEffect } from 'react'

const SignInPage = () => {
  const { openDialog } = useDialogContext()

  // trigger sign in dialog box
  useEffect(() => {
    openDialog({
      allowClose: false,
      content: <SignIn />,
    })
  }, [])

  return <></>
}

export default SignInPage

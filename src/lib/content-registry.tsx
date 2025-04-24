import SignIn from '@/components/common/signin-dialog'

enum ContentEnum {
  SIGN_IN = 'SIGN_IN',
}

const contentMap: Record<ContentEnum, React.ReactNode> = {
  [ContentEnum.SIGN_IN]: <SignIn />,
}

export { ContentEnum }
export default contentMap

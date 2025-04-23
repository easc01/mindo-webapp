import SignIn from '@/components/common/sign-in'

enum ContentEnum {
  SIGN_IN = 'SIGN_IN',
}

const contentMap: Record<ContentEnum, React.ReactNode> = {
  [ContentEnum.SIGN_IN]: <SignIn />,
}

export { ContentEnum }
export default contentMap

enum ActionEnum {
  SIGN_IN = 'SIGN_IN',
}

const actionMap: Record<ActionEnum, () => void> = {
  [ActionEnum.SIGN_IN]: () => console.log('SIGNED UP'),
}

export { ActionEnum }
export default actionMap

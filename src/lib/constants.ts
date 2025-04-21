enum APP_ENVIRONMENT {
  DEVELOPMENT = 'dev',
  PRODUCTION = 'prod',
  QA = 'qa',
}

enum SORT_ORDER {
  ASC = 'ASC',
  DESC = 'DESC',
}

enum ToastVariant {
  DEFAULT = 'default',
  WARNING = 'warning',
  SUCCESS = 'success',
  ERROR = 'error',
}

const ACCESS_TOKEN_KEY = 'accessToken'

export { APP_ENVIRONMENT, SORT_ORDER, ToastVariant, ACCESS_TOKEN_KEY }

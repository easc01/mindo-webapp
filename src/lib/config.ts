interface IAppConfig {
  env: 'dev' | 'prod' | 'qa'
  appUrl: string
  serverBaseUrl: string
}

const appConfig: IAppConfig = {
  env: import.meta.env.VITE_ENV,
  appUrl: import.meta.env.VITE_APP_URL,
  serverBaseUrl: import.meta.env.VITE_SERVER_BASE_URL,
} as const

export { appConfig }

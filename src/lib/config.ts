interface IAppConfig {
  env: 'dev' | 'prod' | 'qa'
  appUrl: string
  serverBaseUrl: string
  googleClientId: string
}

const appConfig: IAppConfig = {
  env: import.meta.env.VITE_ENV,
  appUrl: import.meta.env.VITE_APP_URL,
  serverBaseUrl: import.meta.env.VITE_SERVER_BASE_URL,
  googleClientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
} as const

export { appConfig }

const ROUTES = {
  LAUNCH_SCREEN: '/',
  HELPANDSUPPORT: '/help',
  SIGN_IN: '/sign-in',
  ERROR_403: '/error',

  PLAYLIST: {
    MAIN: '/playlist',
    PLAYLIST: (playlistId?: string) =>
      `/playlist/${playlistId || ':playlistId'}`,
    VIDEO: (playlistId?: string, topicId?: string, videoId?: string) =>
      `/playlist/${playlistId || ':playlistId'}/${topicId || ':topicId'}/${videoId || ':videoId'}`,
  },
  COMMUNITIES: {
    MAIN: '/community',
  },
  QUIZ: {
    MAIN: '/quiz',
  },
  USER: {
    MAIN: '/user',
  },
} as const

export default ROUTES

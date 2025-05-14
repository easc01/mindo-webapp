const ROUTES = {
  LAUNCH_SCREEN: '/',
  HELPANDSUPPORT: '/help',
  SIGN_IN: '/sign-in',
  ERROR_403: '/error',

  PLAYLIST: {
    MAIN: '/playlist',
    LOAD_PLAYLIST: (playlistTitle?: string) =>
      `/playlist/load/${playlistTitle || ':playlistTitle'}`,
    PLAYLIST: (playlistId?: string) =>
      `/playlist/${playlistId || ':playlistId'}`,
    LOAD_VIDEOS: (playlistId?: string, topicId?: string) =>
      `/playlist/${playlistId || ':playlistId'}/${topicId || ':topicId'}`,
    VIDEO: (playlistId?: string, topicId?: string, videoId?: string) =>
      `/playlist/${playlistId || ':playlistId'}/${topicId || ':topicId'}/${videoId || ':videoId'}`,
  },
  COMMUNITIES: {
    MAIN: '/community',
    CHAT: (communityId?: string) =>
      `/community/${communityId || ':communityId'}`,
  },
  QUIZ: {
    MAIN: '/quiz',
    PLAY: (topicName?: string) => `/quiz/${topicName || ':topicName'}`,
  },
  USER: {
    MAIN: '/user',
  },
} as const

export default ROUTES

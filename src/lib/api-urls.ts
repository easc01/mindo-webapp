const API_URLS = {
  AUTH: {
    GOOGLE_SIGNIN: '/auth/google',
    REFRESH: '/auth/refresh',
  },
  PLAYLIST: {
    MAIN: '/playlists',
    TOPICS: '/topics',
  },
  COMMUNITIES: {
    MAIN: '/communities',
    MESSAGES: (communityId: string, lastMessageTimestamp?: Date) =>
      `/messages?communityId=${communityId}&lastMessageTime=${lastMessageTimestamp ?? ''}`,
  },
  QUIZ: {
    MAIN: '/quizzes',
  },
  USER: {
    USER: '/users',
  },
}

export default API_URLS

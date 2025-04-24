import { ReactNode } from 'react'
import AuthWrapper from '@/hoc/auth-wrapper'
import ROUTES from '@/navigation/routes'
import PlaylistMainPage from '@/pages/playlist/playlist-main'
import LaunchScreen from '@/pages/common/launch-screen'
import SignInPage from '@/pages/common/sign-in'
import CommunityMainPage from '@/pages/community/community-main'
import QuizMainPage from '@/pages/quiz/quiz-main'

interface Route {
  path: string
  element: ReactNode
  title: string
}

// Simplified protection logic
const withAuth = (component: ReactNode): ReactNode => {
  const ProtectedComponent = AuthWrapper(() => component)
  return <ProtectedComponent />
}

// Helper function to protect multiple routes
const protectRoutes = (routes: Route[]): Route[] => {
  return routes.map((route) => ({
    ...route,
    element: withAuth(route.element),
  }))
}

const publicRoutes: Route[] = [
  {
    path: ROUTES.SIGN_IN,
    element: <SignInPage />,
    title: 'Sign in',
  },
  {
    path: ROUTES.LAUNCH_SCREEN,
    element: <LaunchScreen />,
    title: '',
  },
]

const playlistRoutes: Route[] = [
  {
    path: ROUTES.PLAYLIST.PLAYLIST_MAIN,
    element: <PlaylistMainPage />,
    title: 'Playlist',
  },
]

const quizRoutes: Route[] = [
  {
    path: ROUTES.QUIZ.QUIZ_MAIN,
    element: <QuizMainPage />,
    title: 'Playlist',
  },
]

const communityRoutes: Route[] = [
  {
    path: ROUTES.COMMUNITIES.COMMUNITIES_MAIN,
    element: <CommunityMainPage />,
    title: 'Playlist',
  },
]

const protectedRoutes = protectRoutes([
  ...playlistRoutes,
  ...quizRoutes,
  ...communityRoutes,
])

const routesData: Route[] = [...publicRoutes, ...protectedRoutes]

export default routesData

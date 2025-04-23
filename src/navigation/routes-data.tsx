import { ReactNode } from 'react'
import AuthWrapper from '@/hoc/auth-wrapper'
import ROUTES from '@/navigation/routes'
import LaunchScreen from '@/pages'

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

const mainRoutes = [

]

const publicRoutes = [
  {
    path: ROUTES.LAUNCH_SCREEN,
    element: <LaunchScreen />,
    title: '',
  },
  {
    path: ROUTES.SIGN_IN,
    element: <>Sign In</>,
    title: 'Sign in',
  },
]

const protectedRoutes = protectRoutes([])

const routesData: Route[] = [...protectedRoutes, ...publicRoutes]

export default routesData

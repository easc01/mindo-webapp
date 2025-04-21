import { ReactNode } from 'react'
import AuthWrapper from '@/hoc/auth-wrapper'
import ROUTES from '@/navigation/routes'
import { title } from 'process'

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
  {
    path: ROUTES.LAUNCH_SCREEN,
    element: <>Launch Screen</>,
    title: '',
  },
]

const publicRoutes = [
  {
    path: ROUTES.SIGN_IN,
    element: <>Sign In</>,
    title: 'Sign in',
  },
]

const protectedRoutes = protectRoutes([...mainRoutes])

const routesData: Route[] = [...protectedRoutes, ...publicRoutes]

export default routesData

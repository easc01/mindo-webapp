import { Route, Routes } from 'react-router-dom'
import { cn } from '@/lib/utils'
import routesData from '@/navigation/routes-data'

const PageRouter = () => {
  const pageRoutes = routesData.map((route) => (
    <Route key={route.path} {...route} />
  ))

  return (
    <RootLayout>
      <Routes>{pageRoutes}</Routes>
    </RootLayout>
  )
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className={cn('size-full')}>{children}</div>
}
export default PageRouter

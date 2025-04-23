import routesData from '@/navigation/routes-data'
import { Route, Routes } from 'react-router-dom'
import RootLayout from '@/components/common/root-layout'

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

export default PageRouter

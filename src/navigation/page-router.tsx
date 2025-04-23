import { Route, Routes } from 'react-router-dom'
import routesData from '@/navigation/routes-data'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import DesktopSidePanel from '@/components/desktop/side-panel'

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
  return (
    <SidebarProvider className='font-ubuntu bg-app-dark-0 text-white'>
      <DesktopSidePanel />

      <main>{children}</main>
    </SidebarProvider>
  )
}

export default PageRouter

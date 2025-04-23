import { SidebarProvider } from '@/components/ui/sidebar'
import DesktopSidePanel from '@/components/desktop/side-panel'
import { Toaster } from '@/components/ui/sonner'
import AppDialog from './app-dialog'

interface Props {
  children: React.ReactNode
}

const RootLayout: React.FC<Props> = ({ children }) => {
  return (
    <SidebarProvider className='font-ubuntu bg-app-dark-0 text-white'>
      <DesktopSidePanel />
      <Toaster />
      <AppDialog />

      <main>{children}</main>
    </SidebarProvider>
  )
}

export default RootLayout

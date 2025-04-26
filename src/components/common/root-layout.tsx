import { SidebarProvider } from '@/components/ui/sidebar'
import DesktopSidePanel from '@/components/side-panel/side-panel'
import { Toaster } from '@/components/ui/sonner'
import AppDialog from './app-dialog'
import { DialogProvider } from '@/context/dialog-context'

interface Props {
  children: React.ReactNode
}

const RootLayout: React.FC<Props> = ({ children }) => {
  return (
    <SidebarProvider className='font-ubuntu bg-app-dark-0 text-white'>
      <DialogProvider>
        <DesktopSidePanel />
        <Toaster />

        <AppDialog />
        <main className='w-full pl-64'>{children}</main>
      </DialogProvider>
    </SidebarProvider>
  )
}

export default RootLayout

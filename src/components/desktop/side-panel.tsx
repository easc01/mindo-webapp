import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar'
import { ChevronDown, Settings } from 'lucide-react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'

interface Props {}

const DesktopSidePanel: React.FC<Props> = () => {
  return (
    <Sidebar collapsible='offcanvas' className='bg-app-dark-1'>
      <SidebarHeader className='flex-row'>
        <Avatar className='size-14'>
          <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <div className='flex flex-col justify-center'>
          <p className='text-sm'>@easc01</p>
          <p className='font-medium'>ishantsikdar</p>
        </div>
      </SidebarHeader>

      <SidebarContent className='scrollbar-thin scrollbar-thumb-app-dark-2 scrollbar-track-app-dark-1 p-2'>
        {/* Playlist */}
        <SidebarMenu>
          <Collapsible defaultOpen className='group/collapsible'>
            <SidebarMenuItem>
              <CollapsibleTrigger
                asChild
                className='hover:bg-app-dark-2 text-lg'
              >
                <SidebarMenuButton className='flex justify-between'>
                  <span>Lectures</span>
                  <ChevronDown className='transition-transform group-data-[state=open]/collapsible:rotate-180' />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  <SidebarMenuSubItem className='hover:bg-app-dark-2 rounded-md p-1 text-sm'>
                    AWS SAA Exam Preparation
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem className='hover:bg-app-dark-2 rounded-md p-1 text-sm'>
                    Springboot Full Course
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem className='hover:bg-app-dark-2 rounded-md p-1 text-sm'>
                    Python Programming
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem className='hover:bg-app-dark-2 rounded-md p-1 text-sm'>
                    Tailwind CSS V4
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        </SidebarMenu>

        {/* Quizzes */}
        <SidebarMenu>
          <Collapsible defaultOpen className='group/collapsible'>
            <SidebarMenuItem>
              <CollapsibleTrigger
                asChild
                className='hover:bg-app-dark-2 text-lg'
              >
                <SidebarMenuButton className='flex justify-between'>
                  <span>Quizzes</span>
                  <ChevronDown className='transition-transform group-data-[state=open]/collapsible:rotate-180' />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  <SidebarMenuSubItem className='hover:bg-app-dark-2 rounded-md p-1 text-sm'>
                    Windows Ecosystem
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem className='hover:bg-app-dark-2 rounded-md p-1 text-sm'>
                    WSL - Linux
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem className='hover:bg-app-dark-2 rounded-md p-1 text-sm'>
                    Embedded Programming
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem className='hover:bg-app-dark-2 rounded-md p-1 text-sm'>
                    Machine Learning
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        </SidebarMenu>

        {/* Communities */}
        <SidebarMenu>
          <Collapsible defaultOpen className='group/collapsible'>
            <SidebarMenuItem>
              <CollapsibleTrigger
                asChild
                className='hover:bg-app-dark-2 text-lg'
              >
                <SidebarMenuButton className='flex justify-between'>
                  <span>Communities</span>
                  <ChevronDown className='transition-transform group-data-[state=open]/collapsible:rotate-180' />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  <SidebarMenuSubItem className='hover:bg-app-dark-2 rounded-md p-1 text-sm'>
                    C/C++ Devs
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem className='hover:bg-app-dark-2 rounded-md p-1 text-sm'>
                    Linux
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem className='hover:bg-app-dark-2 rounded-md p-1 text-sm'>
                    100xDevs
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem className='hover:bg-app-dark-2 rounded-md p-1 text-sm'>
                    Coursera
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem className='hover:bg-app-dark-2 rounded-md p-1 text-sm'>
                    Udemy
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem className='hover:bg-app-dark-2 rounded-md p-1 text-sm'>
                    Powershell
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem className='hover:bg-app-dark-2 rounded-md p-1 text-sm'>
                    Coursera
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className='flex-row items-center justify-between'>
        <span className='text-xs'>build 0.0.1</span>

        <Settings />
      </SidebarFooter>
    </Sidebar>
  )
}

export default DesktopSidePanel

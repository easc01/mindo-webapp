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
import {
  BookOpenCheck,
  BookText,
  ChevronDown,
  Settings,
  UsersRound,
} from 'lucide-react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
  SidePanelGroupHeaderProps,
  SidePanelGroupItemProps,
  SidePanelGroupProps,
} from './side-panel-types'
import { communities, playlists } from './mock'

const DesktopSidePanel: React.FC = () => {
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
        <SidePanelGroup
          title='Playlists'
          icon={<BookText />}
          items={playlists}
        />
        <SidePanelGroup
          title='Quizzes'
          icon={<BookOpenCheck />}
          items={playlists}
        />
        <SidePanelGroup
          title='Communities'
          icon={<UsersRound />}
          items={communities}
        />
      </SidebarContent>

      <SidebarFooter className='flex-row items-center justify-between'>
        <span className='text-xs'>build 0.0.1</span>

        <Settings />
      </SidebarFooter>
    </Sidebar>
  )
}

const SidePanelGroup: React.FC<SidePanelGroupProps> = ({
  icon,
  items,
  title,
}) => (
  <SidebarMenu>
    <Collapsible defaultOpen className='group/collapsible'>
      <SidebarMenuItem>
        <SidePanelGroupHeader label={title} icon={icon} />
        <CollapsibleContent>
          <SidebarMenuSub>
            {items.map((item) => (
              <SidePanelGroupItem {...item} />
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  </SidebarMenu>
)

const SidePanelGroupItem: React.FC<SidePanelGroupItemProps> = ({
  label,
  onClick,
}) => (
  <SidebarMenuSubItem
    onClick={onClick}
    className='hover:bg-app-dark-2 rounded-md p-1 text-sm'
  >
    {label}
  </SidebarMenuSubItem>
)

const SidePanelGroupHeader: React.FC<SidePanelGroupHeaderProps> = ({
  label,
  icon,
  onClick,
}) => (
  <CollapsibleTrigger
    onClick={onClick}
    asChild
    className='hover:bg-app-dark-2 text-lg'
  >
    <SidebarMenuButton className='flex justify-between'>
      <div className='flex items-center gap-2'>
        <span>{icon}</span>
        <span>{label}</span>
      </div>
      <ChevronDown className='transition-transform group-data-[state=open]/collapsible:rotate-180' />
    </SidebarMenuButton>
  </CollapsibleTrigger>
)

export default DesktopSidePanel

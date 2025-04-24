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
import { communities, playlists, quizzes } from './mock'
import ROUTES from '@/navigation/routes'
import { useLocation, useNavigate } from 'react-router-dom'

const DesktopSidePanel: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const routesWithSidePanel = [
    ROUTES.PLAYLIST.PLAYLIST_MAIN,
    ROUTES.QUIZ.QUIZ_MAIN,
    ROUTES.COMMUNITIES.COMMUNITIES_MAIN,
  ]

  if (!routesWithSidePanel.includes(location.pathname as any)) {
    return <></>
  }

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

      <SidebarContent className='scrollbar-track-app-dark-1 p-2'>
        <SidePanelGroup
          title='Playlists'
          icon={<BookText />}
          items={playlists}
          onHeaderClick={() => navigate(ROUTES.PLAYLIST.PLAYLIST_MAIN)}
        />
        <SidePanelGroup
          title='Quizzes'
          icon={<BookOpenCheck />}
          items={quizzes}
          onHeaderClick={() => navigate(ROUTES.QUIZ.QUIZ_MAIN)}
        />
        <SidePanelGroup
          title='Communities'
          icon={<UsersRound />}
          items={communities}
          onHeaderClick={() => navigate(ROUTES.COMMUNITIES.COMMUNITIES_MAIN)}
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
  onHeaderClick,
}) => (
  <SidebarMenu>
    <Collapsible defaultOpen className='group/collapsible'>
      <SidebarMenuItem>
        <SidePanelGroupHeader
          onClick={onHeaderClick}
          label={title}
          icon={icon}
        />
        <CollapsibleContent>
          <SidebarMenuSub>
            {items.map((item, i) => (
              <SidePanelGroupItem key={i} {...item} />
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
  <SidebarMenuButton
    onClick={onClick}
    className='hover:bg-app-dark-2 flex cursor-pointer justify-between text-lg'
  >
    <div className='flex items-center gap-2'>
      <span>{icon}</span>
      <span>{label}</span>
    </div>
    <CollapsibleTrigger asChild onClick={(e) => e.stopPropagation()}>
      <ChevronDown className='transition-transform group-data-[state=open]/collapsible:rotate-180' />
    </CollapsibleTrigger>
  </SidebarMenuButton>
)

export default DesktopSidePanel

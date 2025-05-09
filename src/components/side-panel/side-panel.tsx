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
import { playlists, quizzes } from './mock'
import ROUTES from '@/navigation/routes'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppSelector } from '@/hooks/redux'
import { getInitials } from '@/lib/utils'
import AppProfile from '../common/app-profile'

const DesktopSidePanel: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const routesWithSidePanel = [
    ROUTES.PLAYLIST.MAIN,
    ROUTES.QUIZ.MAIN,
    ROUTES.COMMUNITIES.MAIN,
  ]

  const { name, username, profilePictureUrl, joinedCommunities } =
    useAppSelector((state) => state.userData)

  const sidePanelCommunity = joinedCommunities?.map((comm) => ({
    label: comm.title,
    icon: comm.logoUrl,
    onClick: () => navigate(ROUTES.COMMUNITIES.CHAT(comm.id)),
  }))

  if (!routesWithSidePanel.some((route) => location.pathname.includes(route))) {
    return <></>
  }

  return (
    <Sidebar collapsible='offcanvas' className='bg-app-dark-1 w-64'>
      <SidebarHeader className='flex-row'>
        <AppProfile
          name={name}
          username={username}
          profileUrl={profilePictureUrl}
          className='size-14'
        />

        <div className='flex flex-col justify-center'>
          <p className='text-sm'>@{username}</p>
          <p className='font-medium'>{name}</p>
        </div>
      </SidebarHeader>

      <SidebarContent className='scrollbar-track-app-dark-1 p-2'>
        <SidePanelGroup
          title='Playlists'
          icon={<BookText />}
          items={playlists}
          onHeaderClick={() => navigate(ROUTES.PLAYLIST.MAIN)}
        />
        <SidePanelGroup
          title='Quizzes'
          icon={<BookOpenCheck />}
          items={quizzes}
          onHeaderClick={() => navigate(ROUTES.QUIZ.MAIN)}
        />
        <SidePanelGroup
          title='Communities'
          icon={<UsersRound />}
          items={sidePanelCommunity}
          onHeaderClick={() => navigate(ROUTES.COMMUNITIES.MAIN)}
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

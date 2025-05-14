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
import ROUTES from '@/navigation/routes'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppSelector } from '@/hooks/redux'
import AppProfile from '../common/app-profile'
import { useMemo } from 'react'
import { cn } from '@/lib/utils'

const DesktopSidePanel: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const routesWithSidePanel = [
    ROUTES.PLAYLIST.MAIN,
    ROUTES.QUIZ.MAIN,
    ROUTES.COMMUNITIES.MAIN,
  ]

  const {
    name,
    username,
    profilePictureUrl,
    color,
    joinedCommunities,
    recentPlaylists,
  } = useAppSelector((state) => state.userData)

  const sidePanelCommunity = useMemo(
    () =>
      joinedCommunities?.map((comm) => ({
        label: comm.title,
        icon: comm.logoUrl,
        onClick: () => navigate(ROUTES.COMMUNITIES.CHAT(comm.id)),
      })),
    [joinedCommunities]
  )

  const sidePanelPlaylist = useMemo(
    () =>
      recentPlaylists.map((playlist) => ({
        label: playlist.name,
        icon: playlist.thumbnailUrl,
        onClick: () => navigate(ROUTES.PLAYLIST.PLAYLIST(playlist.id)),
      })),
    [recentPlaylists]
  )

  if (!routesWithSidePanel.some((route) => location.pathname.includes(route))) {
    return <></>
  }

  return (
    <Sidebar collapsible='offcanvas' className='bg-app-dark-1 w-64'>
      <SidebarHeader className='flex-row'>
        <AppProfile
          name={name}
          color={color}
          username={username}
          profileUrl={profilePictureUrl}
          className='size-14'
        />

        <div className='flex flex-col justify-center'>
          <p className='text-2xs'>@{username}</p>
          <p className='text-lg font-medium'>{name}</p>
        </div>
      </SidebarHeader>

      <SidebarContent className='scrollbar-track-app-dark-1 p-2'>
        <SidePanelGroup
          title='Playlists'
          icon={<BookText />}
          items={sidePanelPlaylist}
          onHeaderClick={() => navigate(ROUTES.PLAYLIST.MAIN)}
        />
        <SidePanelGroup
          title='Quizzes'
          icon={<BookOpenCheck />}
          items={[]}
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
    className={cn('hover:bg-app-dark-2 rounded-md p-2 text-sm', {
      'cursor-pointer': !!onClick,
    })}
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
    className={cn('hover:bg-app-dark-2 flex justify-between text-lg', {
      'cursor-pointer': !!onClick,
    })}
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

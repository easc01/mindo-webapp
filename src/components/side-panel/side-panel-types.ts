interface SidePanelGroupProps {
  title: string
  icon: React.ReactNode
  items: SidePanelGroupItemProps[]
  onHeaderClick?: () => void
}

interface SidePanelGroupItemProps {
  icon?: string
  label: string
  onClick?: () => void
}

interface SidePanelGroupHeaderProps {
  label: string
  icon: React.ReactNode
  onClick?: () => void
}

export type {
  SidePanelGroupProps,
  SidePanelGroupItemProps,
  SidePanelGroupHeaderProps,
}

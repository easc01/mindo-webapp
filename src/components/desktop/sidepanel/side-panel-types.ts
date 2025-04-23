interface SidePanelGroupProps {
  title: string
  icon: React.ReactNode
  items: SidePanelGroupItemProps[]
}

interface SidePanelGroupItemsProps {
  groupItems: SidePanelGroupItemProps[]
}

interface SidePanelGroupItemProps {
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
  SidePanelGroupItemsProps,
  SidePanelGroupItemProps,
  SidePanelGroupHeaderProps,
}

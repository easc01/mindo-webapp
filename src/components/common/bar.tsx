import { cn } from '@/lib/utils'

interface BarProps {
  direction?: 'vertical' | 'horizontal'
  className?: string
}

const Bar: React.FC<BarProps> = ({ direction = 'horizontal', className }) => (
  <div
    className={cn(
      'bg-app-dark-1',
      {
        'h-0.5 w-full': direction === 'horizontal',
        'h-full w-0.5': direction === 'vertical',
      },
      className
    )}
  />
)

export default Bar

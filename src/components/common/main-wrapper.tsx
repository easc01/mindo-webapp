import { cn } from '@/lib/utils'

const MainWrapper: React.FC<{
  children: React.ReactNode
  className?: string
}> = ({ children, className }) => (
  <div className={cn('relative size-full', className)}>{children}</div>
)

export default MainWrapper

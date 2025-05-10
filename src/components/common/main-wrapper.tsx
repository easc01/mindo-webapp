import { cn } from '@/lib/utils'
import { forwardRef } from 'react'

type MainWrapperProps = {
  children?: React.ReactNode
  className?: string
}

const MainWrapper = forwardRef<HTMLDivElement, MainWrapperProps>(
  ({ children, className }, ref) => (
    <div ref={ref} className={cn('relative size-full', className)}>
      {children}
    </div>
  )
)

export default MainWrapper

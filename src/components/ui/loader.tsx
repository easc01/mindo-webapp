import { cn } from '@/lib/utils'

interface ILoaderProps {
  className?: string
  sizeClassName?: string
}

const Loader = ({ className, sizeClassName = 'size-28' }: ILoaderProps) => {
  const shadowWidth = sizeClassName.replace(/^size-/, 'w-')

  return (
    <div
      className={cn(
        'flex h-full w-full items-center justify-center',
        className
      )}
    >
      <div className='flex items-center justify-center gap-1'>
        <span className='flex flex-col items-center'>
          {/* <Football
            className={cn(
              'size-28 animate-[bounce_1s_infinite] rounded-full fill-white/90',
              sizeClassName
            )}
          /> */}
          <div
            className={cn(
              'h-1 animate-[shadow-scale_1s_cubic-bezier(0.36,0,0.66,1)_infinite] rounded-[100%] bg-white/50',
              shadowWidth
            )}
          />
        </span>
      </div>
    </div>
  )
}

export default Loader

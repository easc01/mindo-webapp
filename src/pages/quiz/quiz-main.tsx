import MainWrapper from '@/components/common/main-wrapper'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import ROUTES from '@/navigation/routes'
import { Search } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const QuizMainPage = () => {
  const navigate = useNavigate()
  const [text, setText] = useState<string>('')
  const updateText = (s: string) => setText(s)

  return (
    <MainWrapper className='flex items-center justify-center'>
      <div className='bg-app-dark-1 z-20 w-60 rounded-md p-5 md:w-80'>
        <p className='mb-4 text-2xl'>Make a quiz</p>

        <div className='relative mb-4'>
          <Input
            value={text}
            onChange={(e) => updateText(e.target.value)}
            placeholder='eg. software engineering'
            className='bg-app-dark-0 border-app-dark-2 h-10 rounded-3xl border-2'
          />
          <Search className='stroke-app-dark-2 absolute top-1/2 right-4 size-5 -translate-y-1/2 stroke-2' />
        </div>

        <div className='flex items-center justify-end'>
          <Button
            onClick={() => navigate(ROUTES.QUIZ.PLAY(text))}
            className='cursor-pointer'
          >
            Make a Quiz
          </Button>
        </div>
      </div>
    </MainWrapper>
  )
}

export default QuizMainPage

import Loader from '@/components/common/loader'
import MainWrapper from '@/components/common/main-wrapper'
import { Button } from '@/components/ui/button'
import { useDialog } from '@/context/dialog-context'
import { cn } from '@/lib/utils'
import ROUTES from '@/navigation/routes'
import { useGenerateQuiz, useVerifyQuiz } from '@/services/quiz'
import { QuizQuestion } from '@/types/quiz'
import { BadgeCheck } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const QuizDedicatedPage = () => {
  const navigate = useNavigate()
  const { topicName } = useParams()
  const { openDialog, closeDialog } = useDialog()

  const { data, isLoading } = useGenerateQuiz(topicName!)
  const { mutateAsync: verifyQuiz } = useVerifyQuiz()

  const [response, setResponse] = useState<Record<string, number>>({})

  const [selected, setSelected] = useState<QuizQuestion>({
    correctOption: 0,
    options: [],
    question: '',
    questionId: '',
    questionNumber: 0,
  })

  const scrollRefs = useRef<Record<string, HTMLDivElement | null>>({})

  useEffect(() => {
    if (data) {
      setSelected(data.data.questions[0])
    }
  }, [data])

  useEffect(() => {
    if (selected.questionId) {
      scrollRefs.current[selected.questionId]?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      })
    }
  }, [selected])

  const changeQuestion = (qNum: number) => {
    if (data) {
      setSelected(data.data.questions[qNum])
    }
  }

  const chooseOption = (attemptedOption: number, questionId: string) => {
    setResponse((prev) => ({
      ...prev,
      [questionId]: attemptedOption,
    }))

    if (data) {
      setSelected((p) => {
        const next =
          p.questionNumber < 10
            ? data.data.questions[p.questionNumber]
            : data.data.questions[9]
        return next
      })
    }
  }

  const getLabel = (num: number) => {
    switch (num) {
      case 1:
        return 'A'
      case 2:
        return 'B'
      case 3:
        return 'C'
      case 4:
        return 'D'
    }
  }

  if (isLoading) {
    return <Loader />
  }

  const ResultDialog = React.memo(
    ({ result }: { result: { grade: string; marks: number } }) => {
      return (
        <div className='w-60 text-center md:w-80'>
          <p>Grade</p>
          <p className='text-9xl'>{result?.grade || '-'}</p>
          <p className='mt-8'>Marks - {result?.marks ?? '-'}</p>
        </div>
      )
    }
  )

  return (
    <MainWrapper className='flex h-screen flex-col overflow-hidden p-4'>
      <div className='flex h-full w-full items-center justify-between pb-4'>
        <h2 className='w-[70%] text-xl'>{selected.question}</h2>

        <Button
          onClick={async () => {
            const res = await verifyQuiz({
              quizId: data?.data.quizId!,
              questions: Object.entries(response).map(
                ([questionId, attemptedOption]) => ({
                  questionId,
                  attemptedOption,
                })
              ),
            })

            openDialog({
              allowClose: true,
              content: <ResultDialog result={res.data} />,
              action: {
                label: 'Close',
                execute: () => {
                  navigate(ROUTES.QUIZ.MAIN)
                  closeDialog()
                },
              },
            })
          }}
          className='hover:bg-app-dark-1 cursor-pointer'
        >
          Submit
        </Button>
      </div>

      <div className='flex h-[calc(100%-5rem)] gap-4'>
        <div className='grid h-full w-full grid-cols-2 gap-4'>
          {selected.options?.map((option) => (
            <div
              key={option.optionNumber}
              onClick={() =>
                chooseOption(option.optionNumber + 1, selected.questionId)
              }
              className={cn(
                'flex h-full cursor-pointer flex-col items-center justify-center rounded-md p-4 text-white',
                (() => {
                  switch (option.optionNumber) {
                    case 4:
                      return 'bg-red-100 text-red-800 hover:bg-red-200'
                    case 1:
                      return 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                    case 2:
                      return 'bg-green-100 text-green-800 hover:bg-green-200'
                    case 3:
                      return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                    default:
                      return 'bg-gray-100'
                  }
                })()
              )}
            >
              <p className='text-2xl font-bold'>
                {getLabel(option.optionNumber)}
              </p>
              <p className='text-center'>{option.option}</p>
            </div>
          ))}
        </div>

        <div className='bg-app-dark-1 h-full w-0.5'></div>

        <div className='flex w-96 flex-col gap-2 overflow-y-auto'>
          {data?.data.questions.map((ques, i) => (
            <div
              key={ques.questionId}
              ref={(el) => {
                scrollRefs.current[ques.questionId] = el
              }}
              onClick={() => changeQuestion(i)}
              className={cn(
                'bg-app-dark-1 relative cursor-pointer rounded-md border-2 p-2 text-xs',
                ques.questionId === selected.questionId
                  ? 'border-white'
                  : 'border-transparent'
              )}
            >
              <p>{ques.question}</p>

              {response[ques.questionId] && (
                <BadgeCheck className='stroke-app-dark-1 absolute top-1/2 right-2 -translate-y-1/2 fill-green-600' />
              )}
            </div>
          ))}
        </div>
      </div>
    </MainWrapper>
  )
}

export default QuizDedicatedPage

import useApi from '@/lib/api'
import API_URLS from '@/lib/api-urls'
import { APIResponse } from '@/types/common'
import { QuizData, VerifyQuizResults } from '@/types/quiz'

const useGenerateQuiz = (title: string) => {
  const { usePostQuery } = useApi()

  return usePostQuery<APIResponse<QuizData>>(
    `${API_URLS.QUIZ.MAIN}/gen-ai?topicName=${title}`,
    {},
    [API_URLS.QUIZ.MAIN, 'gen-ai', title]
  )
}

const useVerifyQuiz = () => {
  const { usePost } = useApi()

  return usePost<APIResponse<VerifyQuizResults>>(
    `${API_URLS.QUIZ.MAIN}/verify`,
    [API_URLS.QUIZ.MAIN, '/verify']
  )
}

export { useGenerateQuiz, useVerifyQuiz }

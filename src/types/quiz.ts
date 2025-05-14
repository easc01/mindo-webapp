export type VerifyQuizParams = {
  quizId: string
  questions: VerifyQuizQuestion[]
}

export type VerifyQuizQuestion = {
  questionId: string
  attemptedOption: number
}

export type VerifyQuizResults = {
  grade: string
  marks: number
}

export interface QuizOption {
  option: string
  optionNumber: number
}

export interface QuizQuestion {
  questionId: string
  question: string
  questionNumber: number
  correctOption: number
  options: QuizOption[]
}

export interface QuizData {
  quizId: string
  topicName: string
  questions: QuizQuestion[]
}

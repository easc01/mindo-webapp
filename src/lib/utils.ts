import { formatDistanceStrict } from 'date-fns'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const trimCount = (balance: number): string =>
  new Intl.NumberFormat('en', {
    notation: 'compact',
    compactDisplay: 'short',
    maximumFractionDigits: 1,
  }).format(balance)

export const timeAgo = (date: Date) => {
  try {
    return formatDistanceStrict(date, new Date(), { addSuffix: true })
  } catch (error) {
    console.log('date', date)
    console.error(error)
    return ''
  }
}

export const getInitials = (sentence: string): string =>
  sentence
    .split(/\s+/)
    .filter((word) => word.length > 0)
    .map((word) => word[0].toUpperCase())
    .join('')

export const formatTimestamp = (input: string | Date): string => {
  const date = new Date(input)
  const now = new Date()

  const isToday =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear()

  const yesterday = new Date()
  yesterday.setDate(now.getDate() - 1)
  const isYesterday =
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear()

  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const time = `${hours}:${minutes}`

  if (isToday) return `Today ${time}`
  if (isYesterday) return `Yesterday ${time}`

  const day = date.getDate()
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]
  const month = monthNames[date.getMonth()]

  return `${day} ${month} ${time}`
}

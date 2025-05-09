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

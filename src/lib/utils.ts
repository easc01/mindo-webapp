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

export const timeAgo = (date: Date | number) =>
  formatDistanceStrict(date, new Date(), { addSuffix: true })

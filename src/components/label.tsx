import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface LabelProps {
  title: string
  children: ReactNode
  className?: string
}

export function Label({ children, title, className }: LabelProps) {
  return (
    <label className={twMerge('flex flex-col', className)}>
      <span>{title}</span>
      {children}
    </label>
  )
}

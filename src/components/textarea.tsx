import { TextareaHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

interface InputProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string
}

export function TextArea({ className, ...rest }: InputProps) {
  return (
    <textarea
      {...rest}
      className={twMerge(
        'h-32 w-full resize-none rounded border border-solid border-black/25 px-4 py-2 focus:outline-blue-500',
        className,
      )}
    />
  )
}

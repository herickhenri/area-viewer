import { ComponentProps, ReactNode } from 'react'
import { VariantProps, tv } from 'tailwind-variants'

const button = tv({
  base: 'flex w-max items-center justify-center rounded text-lg font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-80',
  variants: {
    theme: {
      default:
        'bg-blue-800 px-6 py-2 text-white hover:bg-blue-900 disabled:bg-blue-900',
      delete:
        'border-2 border-red-500  bg-transparent px-6 py-1 text-red-500 hover:bg-red-500 hover:text-white',
    },
  },
  defaultVariants: {
    theme: 'default',
  },
})

type buttonProps = ComponentProps<'button'> &
  VariantProps<typeof button> & {
    children?: ReactNode
  }

export function Button({ children, className, theme, ...rest }: buttonProps) {
  return (
    <button className={button({ className, theme })} {...rest}>
      {children}
    </button>
  )
}

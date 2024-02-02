import { ComponentProps, forwardRef } from 'react'
import { tv, VariantProps } from 'tailwind-variants'

const input = tv({
  base: 'mt-2 w-full rounded border border-solid border-black/25 px-4 py-2 focus:outline-blue-500 disabled:text-black/50',
  variants: {
    error: {
      true: 'border-2 border-red-500 focus:outline-red-600',
    },
  },
  defaultVariants: {
    error: false,
  },
})

type InputProps = ComponentProps<'input'> &
  VariantProps<typeof input> & {
    className?: string
  }

export default forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, error, ...rest }: InputProps,
  ref,
) {
  return <input ref={ref} className={input({ error, className })} {...rest} />
})

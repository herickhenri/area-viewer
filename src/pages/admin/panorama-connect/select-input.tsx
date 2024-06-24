import Select from 'react-select'
import { tv } from 'tailwind-variants'

export type Item = {
  value: string
  label: string
}

interface selectInputProps {
  options?: Item[]
  onChange: (value: string | null) => void
  defaultValue?: Item
  value: string
  isError: boolean
}

export function SelectInput({
  options,
  onChange,
  defaultValue,
  value,
  isError,
}: selectInputProps) {
  function changeValue(item: Item | null) {
    item && onChange(item.value)

    return item
  }

  const selectedItem = options?.find((option) => option.value === value)

  const select = tv({
    base: 'flex items-center justify-between rounded border border-black/25 px-2 outline-2',
    variants: {
      outline: {
        default:
          'outline-blue-500 focus-within:border-transparent focus-within:outline',
        error: 'border-transparent outline outline-red-500',
      },
    },
    defaultVariants: {
      outline: 'default',
    },
  })

  return (
    <div className={select({ outline: isError ? 'error' : 'default' })}>
      <Select
        options={options}
        classNames={{
          container: () => 'flex-1',
          control: () => 'border-none shadow-none flex-1',
        }}
        value={selectedItem}
        onChange={changeValue}
        defaultValue={defaultValue}
        placeholder="Selecione um panorama"
      />
    </div>
  )
}

import Select from 'react-select'
import { X } from '@phosphor-icons/react'

export type Item = {
  value: string
  label: string
}

interface selectInputProps {
  options?: Item[]
  defaultValue?: Item
  onChange: (item: Item | null) => void
  remove: () => void
}

export function SelectInput({
  options,
  onChange,
  defaultValue,
  remove,
}: selectInputProps) {
  return (
    <div className="flex flex-1 items-center justify-between rounded border border-black/25 px-2 outline-2 outline-blue-500 focus-within:border-transparent focus-within:outline">
      <Select
        options={options}
        classNames={{
          container: () => 'bg-transparent w-full',
          control: () => 'border-none bg-transparent  shadow-none',
        }}
        onChange={onChange}
        defaultValue={defaultValue}
        placeholder="Selecione um equipamento"
      />

      <X size={16} className="mr-2 block cursor-pointer" onClick={remove} />
    </div>
  )
}

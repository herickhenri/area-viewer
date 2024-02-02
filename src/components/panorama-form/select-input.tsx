import Select from 'react-select'
import { Item } from './markings'
import { X } from '@phosphor-icons/react'

interface selectInputProps {
  options?: Item[]
  onChange: (item: Item | null) => void
  defaultValue?: Item
  remove: () => void
}

export function SelectInput({
  options,
  onChange,
  defaultValue,
  remove,
}: selectInputProps) {
  return (
    <div className="flex items-center justify-between rounded border border-black/25 px-2 outline-2 outline-blue-500 focus-within:border-transparent focus-within:outline">
      <Select
        options={options}
        classNames={{
          container: () => 'flex-1',
          control: () => 'border-none shadow-none flex-1',
        }}
        onChange={onChange}
        defaultValue={defaultValue}
        placeholder="Selecione um equipamento"
      />

      <X size={16} className="mr-2 block cursor-pointer" onClick={remove} />
    </div>
  )
}

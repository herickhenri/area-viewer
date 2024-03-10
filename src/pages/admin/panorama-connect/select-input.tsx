import Select from 'react-select'

export type Item = {
  value: string
  label: string
}

interface selectInputProps {
  options?: Item[]
  onChange: (value: string | null) => void
  defaultValue?: Item
  value: string
}

export function SelectInput({
  options,
  onChange,
  defaultValue,
  value,
}: selectInputProps) {
  function changeValue(item: Item | null) {
    item && onChange(item.value)

    return item
  }

  const selectedItem = options?.find((option) => option.value === value)

  return (
    <div className="flex items-center justify-between rounded border border-black/25 px-2 outline-2 outline-blue-500 focus-within:border-transparent focus-within:outline">
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

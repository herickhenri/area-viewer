import Select from 'react-select'

export type Item = {
  value: string
  label: string
}

interface selectInputProps {
  options?: Item[]
  onChange: (item: Item | null) => void
  defaultValue?: Item
}

export function SelectInput({
  options,
  onChange,
  defaultValue,
}: selectInputProps) {
  return (
    <div className="flex flex-1 items-center justify-between rounded border border-black/25 outline-2 outline-blue-500 focus-within:border-transparent focus-within:outline">
      <Select
        options={options}
        classNames={{
          container: () => 'flex-1',
          control: () => 'border-none shadow-none flex-1',
        }}
        onChange={onChange}
        defaultValue={defaultValue}
        placeholder="Selecione um panorama"
      />
    </div>
  )
}

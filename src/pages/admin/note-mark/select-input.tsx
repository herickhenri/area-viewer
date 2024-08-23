import { Panorama } from '@/types/Panorama'
import Select from 'react-select'

export type Item = {
  value: string
  label: string
}

interface selectInputProps {
  panoramas?: Panorama[]
  onChange: (value: string) => void
  value: string
  defaultValue?: Item
}

export function SelectInput({
  panoramas,
  onChange,
  defaultValue,
  value,
}: selectInputProps) {
  const options = panoramas?.map(({ id, name }) => ({ label: name, value: id }))
  const currentOption = options?.find((option) => option.value === value)

  return (
    <div className="z-50 flex flex-1 items-center justify-between rounded border border-black/25 outline-2 outline-blue-500 focus-within:border-transparent focus-within:outline">
      <Select
        options={options}
        classNames={{
          container: () => 'flex-1',
          control: () => 'border-none shadow-none flex-1',
        }}
        value={currentOption}
        onChange={(option) => option && onChange(option.value)}
        defaultValue={defaultValue}
        placeholder="Selecione um panorama"
      />
    </div>
  )
}

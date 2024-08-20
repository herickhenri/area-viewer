import { useSearchParams } from 'react-router-dom'
import { Panorama } from '@/types/Panorama'
import Select from 'react-select'

export type Item = {
  value: string
  label: string
}

interface selectInputProps {
  onChange: (value: string | null) => void
  value: string
  panoramas: Panorama[]
  defaultPanorama?: Panorama
  isError?: boolean
  inputName: string
}

export function SelectInput({
  panoramas,
  onChange,
  defaultPanorama,
  inputName,
}: selectInputProps) {
  const [, setSearchParams] = useSearchParams()

  function changeValue(value: string) {
    setSearchParams((state) => {
      state.set(inputName, value)
      return state
    })

    onChange(value)
  }

  const defaultValue = defaultPanorama && {
    value: defaultPanorama.id,
    label: defaultPanorama.name,
  }

  const options = panoramas.map(({ id, name }) => ({
    value: id,
    label: name,
  }))

  return (
    <div className="z-40 flex flex-1 items-center justify-between rounded border border-black/25 px-2 outline-2 outline-blue-500 focus-within:border-transparent focus-within:outline">
      <Select
        options={options}
        classNames={{
          container: () => 'bg-transparent w-full',
          control: () => 'border-none bg-transparent  shadow-none',
        }}
        defaultValue={defaultValue}
        onChange={(value) => value && changeValue(value.value)}
        placeholder="Selecione um panorama"
      />
    </div>
  )
}

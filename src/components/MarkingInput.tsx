import Select from 'react-select'

import { X } from "@phosphor-icons/react"
import { Marking } from "../pages/AddPanorama"

type Item = {
    value: string;
    label: string;
}
 
interface MarkingInputProps {
  options: Item[]
  marking?: Marking
  defaultValue?: Item
  deleteMark: (marking?: Marking) => void
  handleMarking: (marking: Marking | undefined, tag_equip: string) => void
}

export function MarkingInput({ 
  defaultValue,
  options,
  marking,
  deleteMark, 
  handleMarking,
}: MarkingInputProps) {


  function changeValue(valueItem: Item | null) {
    if(valueItem) {
      handleMarking(marking, valueItem.value)
    }
  }
  
  return (
    <div className="focus-within:border-transparent focus-within:outline outline-2 outline-blue-500 px-2 flex justify-between items-center border border-black/25 rounded">
      <Select
        options={options}
        classNames={{
          container: () => "flex-1",
          control: () => "border-none shadow-none flex-1",
        }}
        onChange={value => changeValue(value)}
        defaultValue={defaultValue}
        placeholder="Selecione um equipamento"
        autoFocus={!marking}
      />
      
      <X size={16} className='block mr-2' onClick={() => deleteMark(marking)}/>
  </div>
  )
}
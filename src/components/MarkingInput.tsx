import Select from 'react-select'

import { Check, PencilSimple, X } from "@phosphor-icons/react"
import { Coord, Marking } from "../pages/AddPanorama"
import { useState } from 'react'
import { equipamentos } from '../data/DataEquip'

type Item = {
    value: string;
    label: string;
}
 
interface MarkingInputProps {
  options: Item[]
  coord: Coord
  defaultValue?: Item
  tag_equip?: string
  deleteMark: (tag_equip: string | undefined) => void
  handleMarking: (coord: Coord, tag_equip: string) => void
}

export function MarkingInput({ 
  coord, 
  defaultValue,
  options,
  tag_equip,
  deleteMark, 
  handleMarking,
}: MarkingInputProps) {


  function changeValue(valueItem: Item | null) {
    if(valueItem) {
      handleMarking(coord, valueItem.value)
    }
  }
  
  return (
    <div className="px-2 flex justify-between items-center border border-black/25 rounded">
      <Select
        id={tag_equip}
        options={options}
        classNames={{
          container: () => "flex-1",
          control: () => "border-none shadow-none flex-1",
        }}
        onChange={value => changeValue(value)}
        defaultValue={defaultValue}
        placeholder="Selecione um equipamento"
        autoFocus={!tag_equip}
      />
      
      <X size={16} className='block mr-2' onClick={() => deleteMark(tag_equip)}/>
  </div>
  )
}
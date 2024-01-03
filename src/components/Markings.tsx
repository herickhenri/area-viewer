import Select from 'react-select'

import { X } from "@phosphor-icons/react"
import { Coord, createPanoramaFormData } from '../pages/PanoramaForm';
import { equipamentos } from '../data/DataEquip';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { useEffect } from 'react';

type Item = {
  value: string
  label: string
}

interface MarkingsProps {
  coord: Coord | null
}

export function Markings({ coord } : MarkingsProps) {
  const { control } = useFormContext<createPanoramaFormData>()

  const { fields: markings, remove, update, append } = useFieldArray({
    control,
    name: 'markings',
  })

  const markings_tags = markings.map(marking => marking.equip_tag)

  const options: Item[] = equipamentos
  .filter((equip) => !markings_tags.includes(equip.tag.id))
  .map(equip => ({value: equip.tag.id, label: equip.name}))

  useEffect(() => {
    if(!coord) {
      return
    }

    //Verifica se ja há alguma marcação sem tag
    if(markings[markings.length -1]?.equip_tag === "") {
      update(markings.length-1, {equip_tag: "", coord})
      return
    }

    //Se não houver, é criada uma nova
    append({equip_tag: "", coord})
  }, [coord])

  return (
    <div className="flex-1 flex flex-col gap-2">
      <span>Marcações:</span>
      {markings.map((marking, index) =>{
      const equip = equipamentos.find((equip) => equip.tag.id === marking.equip_tag)
      const defaultValue = equip && {value: equip.tag.id, label: equip.name}

      return (
        <div 
          key={marking.id}
          className="focus-within:border-transparent focus-within:outline outline-2 outline-blue-500 px-2 flex justify-between items-center border border-black/25 rounded"
        >
          <Select
            options={options}
            classNames={{
              container: () => "flex-1",
              control: () => "border-none shadow-none flex-1",
            }}
            onChange={item => update(index, {equip_tag: item?.value || '', coord: marking.coord})}
            defaultValue={defaultValue}
            placeholder="Selecione um equipamento"
          />
          
          <X size={16} className='block mr-2 cursor-pointer' onClick={() => remove(index)}/>
        </div>
      )})}

      <span className="flex md:mx-auto text-red-500 text-center">
        Clique na imagem para adicionar uma nova marcação.
      </span>
    </div>
  )
}
import { Coord, createPanoramaFormData } from '.'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { useQuery } from '@tanstack/react-query'
import { getEquipments } from '@/api/get-equipments'
import { Item, SelectInput } from './select-input'

interface MarkingsProps {
  coord: Coord | null
  changeCoord: (coord: Coord | null) => void
}

export function Markings({ coord, changeCoord }: MarkingsProps) {
  const { data: equipments } = useQuery({
    queryKey: ['equipments'],
    queryFn: getEquipments,
  })

  const { control } = useFormContext<createPanoramaFormData>()

  const {
    fields: markings,
    remove,
    append,
    update,
  } = useFieldArray({
    control,
    name: 'markings',
  })

  const markingsIds = markings.map((marking) => marking.equipment_id)

  const options: Item[] | undefined = equipments
    ?.filter((equip) => !markingsIds.includes(equip.id))
    .map((equip) => ({ value: equip.id, label: equip.name }))

  function addMarking(item: Item | null) {
    if (item && coord) {
      append({
        equipment_id: item.value,
        coord_x: coord.coord_x,
        coord_y: coord.coord_y,
      })
    }

    changeCoord(null)
  }

  if (!equipments) {
    return
  }

  return (
    <div className="flex flex-1 flex-col gap-2">
      <span>Marcações:</span>
      {markings.map((marking, index) => {
        const equip = equipments?.find(
          (equip) => equip.id === marking.equipment_id,
        )
        const defaultValue = equip && { value: equip.id, label: equip.name }

        return (
          <div key={marking.equipment_id} className="flex items-center gap-3">
            <SelectInput
              options={options}
              onChange={(item) =>
                item && update(index, { ...marking, equipment_id: item.value })
              }
              defaultValue={defaultValue}
              remove={() => remove(index)}
            />
          </div>
        )
      })}
      {coord && (
        <div className="flex items-center gap-3">
          <SelectInput
            options={options}
            onChange={addMarking}
            remove={() => changeCoord(null)}
          />
        </div>
      )}

      <span className="flex text-center text-red-500 md:mx-auto">
        Clique na imagem para adicionar uma nova marcação.
      </span>
    </div>
  )
}

import { CreatePanoramaFormData } from '.'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { Item, SelectInput } from './select-input'
import { Equipment } from '@/types/Equipment'

export type MarkerPosition = {
  yaw: number
  pitch: number
}

interface EquipmentMarkersProps {
  markerPosition: MarkerPosition | null
  equipments: Equipment[]
  changeMarkerPosition: (markerPosition: MarkerPosition | null) => void
}

export function EquipmentMarkers({
  markerPosition,
  changeMarkerPosition,
  equipments,
}: EquipmentMarkersProps) {
  const { control } = useFormContext<CreatePanoramaFormData>()

  const {
    fields: markings,
    remove,
    append,
    update,
  } = useFieldArray({
    control,
    name: 'equipments',
  })

  const markingsIds = markings.map((marking) => marking.equipment_id)

  const options: Item[] | undefined = equipments
    ?.filter((equip) => !markingsIds.includes(equip.id))
    .map((equip) => ({
      value: equip.id,
      label: `${equip.name} | ${equip.tag.replace(/-/g, '')}`,
    }))

  function addMarker(item: Item | null) {
    if (item && markerPosition) {
      append({
        equipment_id: item.value,
        yaw: markerPosition.yaw,
        pitch: markerPosition.pitch,
      })
    }

    changeMarkerPosition(null)
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
      {markerPosition && (
        <div className="flex items-center gap-3">
          <SelectInput
            options={options}
            onChange={addMarker}
            remove={() => changeMarkerPosition(null)}
          />
        </div>
      )}

      <span className="flex text-center text-red-500 md:mx-auto">
        Clique na imagem para adicionar uma nova marcação.
      </span>
    </div>
  )
}

import { Equipment } from '@/types/Equipment'

interface searchEquipmentsFilterProps {
  equipments: Equipment[]
  search: string
}

export function searchEquipmentsFilter({
  equipments,
  search,
}: searchEquipmentsFilterProps) {
  const filteredEquipment =
    search.length > 0
      ? equipments.filter(({ name, tag }) => {
          const nameUpper = name.toUpperCase().trim()
          const searchUpper = search.toUpperCase().trim()

          return tag.includes(searchUpper) || nameUpper.includes(searchUpper)
        })
      : []

  return filteredEquipment
}

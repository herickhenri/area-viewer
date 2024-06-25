import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Card } from './card'
import { getEquipments } from '@/api/get-equipments'
import { searchEquipmentsFilter } from '@/utils/search-equipments-filter'
import { SearchInput } from '@/components/search-input'

export function EquipmentList() {
  const [search, setSearch] = useState('')

  const { data: equipments } = useQuery({
    queryKey: ['equipments'],
    queryFn: getEquipments,
  })

  if (!equipments) {
    return
  }

  const filteredEquipments = searchEquipmentsFilter({ equipments, search })

  const equipmentsList = search.length > 0 ? filteredEquipments : equipments

  return (
    <div>
      <SearchInput search={search} changeSearch={setSearch} />

      <h1 className="my-5 text-center text-2xl font-semibold">
        Editar equipamentos
      </h1>

      {equipmentsList.length > 0 ? (
        <div className="mb-5 flex flex-wrap gap-5 px-6">
          {equipmentsList.map((equipment) => (
            <Card key={equipment.tag} equipment={equipment} />
          ))}
        </div>
      ) : (
        <span className="block w-screen text-center text-lg font-medium text-black/50">
          Nenhum equipamento encontrado.
        </span>
      )}
    </div>
  )
}

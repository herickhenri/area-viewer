import { MagnifyingGlass } from '@phosphor-icons/react'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Card } from './card'
import { getEquipments } from '@/api/get-equipments'
import { searchEquipmentsFilter } from '@/utils/search-equipments-filter'

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
      <div className="mx-6 mt-6 flex items-center gap-2 rounded-full border border-solid border-black/25 px-4 py-2 outline-2 outline-blue-500 focus-within:border-transparent focus-within:outline md:mx-auto md:w-[32rem]">
        <MagnifyingGlass size={16} className="text-black/25" />
        <input
          className="flex-1 bg-transparent outline-none md:w-96"
          type="text"
          placeholder="Pesquise"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

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

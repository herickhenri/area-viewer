import { useState } from 'react'
import { searchEquipmentsFilter } from '@/utils/search-equipments-filter'
import { useQuery } from '@tanstack/react-query'
import { getEquipments } from '@/api/get-equipments'
import { MagnifyingGlass } from '@phosphor-icons/react'
import { Card } from './card'

export function EquipmentsFeed() {
  const [search, setSearch] = useState('')

  const { data: equipments } = useQuery({
    queryKey: ['equipments'],
    queryFn: getEquipments,
  })

  // TODO: add page loading or error
  if (!equipments) {
    return
  }

  const filteredEquipments = searchEquipmentsFilter({ equipments, search })

  const equipmentsList = search.length > 0 ? filteredEquipments : equipments

  return (
    <div>
      <div className="mx-auto mt-6 flex max-w-[32rem] items-center gap-2 rounded-full border border-solid border-black/25 px-4 py-2 outline-2 outline-blue-500 focus-within:border-transparent focus-within:outline">
        <MagnifyingGlass size={16} className="text-black/25" />
        <input
          className="flex-1 bg-transparent outline-none md:w-96"
          type="text"
          placeholder="Pesquise"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <h1 className="my-5 text-center text-2xl font-semibold">Equipamentos</h1>
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

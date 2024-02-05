import { useState } from 'react'
import { searchEquipmentsFilter } from '@/utils/search-equipments-filter'
import { useQuery } from '@tanstack/react-query'
import { getEquipments } from '@/api/get-equipments'
import { MagnifyingGlass } from '@phosphor-icons/react'
import { SkeletonLoading } from './skeleton-loading'
import { List } from './list'

export function EquipmentsFeed() {
  const [search, setSearch] = useState('')

  const { data: equipments, isLoading } = useQuery({
    queryKey: ['equipments'],
    queryFn: getEquipments,
  })

  // TODO: add page loading or error

  const filteredEquipments =
    equipments && searchEquipmentsFilter({ equipments, search })

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

      <h1 className="my-5 text-center text-2xl font-semibold">Equipamentos</h1>
      {isLoading || !equipmentsList ? (
        <SkeletonLoading />
      ) : (
        <List equipments={equipmentsList} />
      )}
    </div>
  )
}

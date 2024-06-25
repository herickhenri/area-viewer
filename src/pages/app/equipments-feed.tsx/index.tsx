import { useState } from 'react'
import { searchEquipmentsFilter } from '@/utils/search-equipments-filter'
import { useQuery } from '@tanstack/react-query'
import { getEquipments } from '@/api/get-equipments'
import { SkeletonLoading } from './skeleton-loading'
import { List } from './list'
import { SearchInput } from '@/components/search-input'

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
      <SearchInput search={search} changeSearch={setSearch} />

      <h1 className="my-5 text-center text-2xl font-semibold">Equipamentos</h1>
      {isLoading || !equipmentsList ? (
        <SkeletonLoading />
      ) : (
        <List equipments={equipmentsList} />
      )}
    </div>
  )
}

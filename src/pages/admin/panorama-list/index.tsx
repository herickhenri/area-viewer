import { getPanoramas } from '@/api/get-panoramas'
import { useQuery } from '@tanstack/react-query'
import { Item } from './item'
import { useState } from 'react'
import { SearchInput } from '@/components/search-input'
import { searchPanoramasFilter } from '@/utils/search-panoramas-filter'
import { Title } from '@/components/title'

export function PanoramaList() {
  const [search, setSeach] = useState('')

  const { data: panoramas } = useQuery({
    queryKey: ['panoramas'],
    queryFn: getPanoramas,
  })

  const filteredPanoramas =
    panoramas && searchPanoramasFilter({ panoramas, search })

  const panoramasList = search.length > 0 ? filteredPanoramas : panoramas

  return (
    <div>
      <SearchInput search={search} changeSearch={setSeach} />

      <Title>Panoramas</Title>

      <div className="mb-10 flex flex-col gap-6 px-6 md:px-56">
        {panoramasList?.map((panorama) => (
          <Item key={panorama.id} panorama={panorama} />
        ))}
      </div>
    </div>
  )
}

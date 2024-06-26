import { getPanoramas } from '@/api/get-panoramas'
import { Button } from '@/components/button'
import { SearchInput } from '@/components/search-input'
import { Title } from '@/components/title'
import { searchPanoramasFilter } from '@/utils/search-panoramas-filter'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export function PanoramasFeed() {
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
          <div key={panorama.id}>
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-lg">{panorama.name}</h2>
            </div>
            <img
              className="h-40 w-full rounded object-cover md:h-80 md:rounded-lg"
              src={panorama.image_link}
              alt=""
            />
            <div className="mt-2 flex justify-start gap-4">
              <Link to={`viewer/${panorama.id}`}>
                <Button className="mx-0">Ver no mapa</Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

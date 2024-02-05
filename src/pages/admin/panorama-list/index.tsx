import { getPanoramas } from '@/api/get-panoramas'
import { useQuery } from '@tanstack/react-query'
import { Item } from './item'

export function PanoramaList() {
  const { data: panoramas } = useQuery({
    queryKey: ['panoramas'],
    queryFn: getPanoramas,
  })

  return (
    <div>
      <h1 className="my-5 text-center text-2xl font-semibold md:text-4xl">
        Panoramas
      </h1>

      <div className="mb-10 flex flex-col gap-6 px-6 md:px-56">
        {panoramas?.map((panorama) => (
          <Item key={panorama.id} panorama={panorama} />
        ))}
      </div>
    </div>
  )
}

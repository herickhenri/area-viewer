import { getPanoramas } from '@/api/get-panoramas'
import { Button } from '@/components/button'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'

export function PanoramasFeed() {
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
          <div key={panorama.id}>
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-lg">{panorama.name}</h2>
            </div>
            <img
              className="h-40 rounded object-cover md:h-80 md:rounded-lg"
              src={panorama.image_link}
              alt=""
            />
            <div className="mt-2 flex justify-start gap-4">
              <Link to={`/admin/panorama/edit/${panorama.id}`}>
                <Button className="mx-0">Editar</Button>
              </Link>
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

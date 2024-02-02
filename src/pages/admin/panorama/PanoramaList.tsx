import { api } from '@/lib/axios'
import { Panorama } from '@/types/Panorama'
import { PencilSimple } from '@phosphor-icons/react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export function EditPanoramaList() {
  const [panoramas, setPanoramas] = useState<Panorama[]>()

  useEffect(() => {
    api
      .get('/panoramas')
      .then((response) => {
        setPanoramas(response.data.panoramas)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [])

  return (
    <div>
      <h1 className="my-5 text-center text-2xl font-semibold">Panoramas</h1>

      <div className="mb-10 flex flex-col gap-6 px-6 md:px-56">
        {panoramas?.map((panorama) => (
          <div key={panorama.id}>
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-lg">{panorama.name}</h2>
              <Link to={panorama.id}>
                <PencilSimple size={28} className="cursor-pointer" />
              </Link>
            </div>
            <img
              className="h-40 rounded object-cover md:h-80 md:rounded-lg"
              src={panorama.image}
              alt=""
            />
          </div>
        ))}
      </div>
    </div>
  )
}

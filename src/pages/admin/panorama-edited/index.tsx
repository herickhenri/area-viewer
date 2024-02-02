import { getPanorama } from '@/api/get-panorama'
import { Button } from '@/components/button'
import { Check } from '@phosphor-icons/react'
import { useQuery } from '@tanstack/react-query'
import { Link, useParams } from 'react-router-dom'

export function PanoramaEdited() {
  const { id } = useParams()

  const { data: panorama } = useQuery({
    queryKey: ['panorama'],
    queryFn: () => getPanorama(id!),
  })

  if (!panorama) {
    return
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="mx-6 my-5 text-center text-2xl font-semibold md:text-4xl">
        Panorama editado com sucesso
        <Check weight="bold" className="ml-2 inline text-green-500" />
      </h1>

      <img
        className="h-64 w-4/5 rounded object-cover shadow-xl"
        src={panorama.image_link}
        alt=""
      />

      <div className="mt-6 flex w-[36rem] gap-2">
        <Link className="flex-1" to={`/admin/panorama/edit/${panorama.id}`}>
          <Button className="w-full">Editar</Button>
        </Link>
        <Link className="flex-1" to="/admin/panorama/create">
          <Button className="w-full">Criar outro</Button>
        </Link>
        <Link className="flex-1" to="/admin">
          <Button className="w-full">Voltar ao menu</Button>
        </Link>
      </div>
    </div>
  )
}

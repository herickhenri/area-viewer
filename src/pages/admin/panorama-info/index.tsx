import { getPanorama } from '@/api/get-panorama'
import { Button } from '@/components/button'
import { Title } from '@/components/title'
import { useQuery } from '@tanstack/react-query'
import { Link, useParams } from 'react-router-dom'

export function PanoramaInfo() {
  const { id } = useParams()

  const { data: panorama } = useQuery({
    queryKey: ['panorama', id],
    queryFn: () => getPanorama(id!),
    gcTime: 0,
  })

  if (!panorama) {
    return
  }

  return (
    <div className="mx-5 flex flex-1 flex-col items-center">
      <Title>Panorama</Title>

      <div className="mx-auto flex w-full flex-col items-center">
        <img
          className="h-40 w-full rounded object-cover shadow-xl md:h-80 md:w-4/5"
          src={panorama.images[panorama.images.length - 2].link}
          alt=""
        />
        <span className="text-lg font-semibold">{panorama.name}</span>
      </div>

      <div className="relative mt-6 flex w-full flex-1 justify-center gap-2 md:w-[50rem]">
        <Link className="flex-1" to={`/admin/panorama/edit/${panorama.id}`}>
          <Button className="w-full">Editar</Button>
        </Link>
        <Link className="flex-1" to="/admin/panorama/create">
          <Button className="w-full">Criar outro</Button>
        </Link>
        <Link
          className="flex-1"
          to={`/admin/panorama/connections?main_panorama_id=${panorama.id}`}
        >
          <Button className="w-full">Conectar</Button>
        </Link>
        <Link
          className="absolute bottom-10 mx-auto md:static md:flex-1"
          to="/admin"
        >
          <Button className="w-full">Voltar ao menu</Button>
        </Link>
      </div>
    </div>
  )
}

import { CameraSlash } from '@phosphor-icons/react'
import { Link, useParams } from 'react-router-dom'
import { Button } from '@/components/button'
import { useQuery } from '@tanstack/react-query'
import { getEquipment } from '@/api/get-equipment'

export function EquipmentInfo() {
  const { id } = useParams()

  const { data: equipment } = useQuery({
    queryKey: ['equipment', id],
    queryFn: () => getEquipment(id!),
    gcTime: 0,
  })

  if (!equipment) {
    return
  }

  const banner = equipment.photos?.[0]?.link

  return (
    <div className="mx-6 flex flex-col items-center">
      <h1 className="mx-6 my-5 text-center text-2xl font-semibold md:text-4xl">
        Informações do equipamento
      </h1>

      <div className="flex w-full flex-col shadow-xl shadow-black/40 md:w-60">
        {banner ? (
          <img
            className="aspect-square w-full object-cover"
            src={banner}
            alt=""
          />
        ) : (
          <div className="flex aspect-square items-center justify-center bg-slate-300 opacity-50">
            <CameraSlash size={32} />
          </div>
        )}
        <div className="mb-4 flex flex-1 flex-col px-4">
          <span className="text-xs">{equipment.tag}</span>
          <h2 className="flex-1 text-lg font-semibold">{equipment.name}</h2>
          <p className="line-clamp-2">{equipment.description}</p>
        </div>
      </div>
      <div className="my-6 flex w-full flex-col gap-3 md:w-[36rem] md:flex-row">
        <Link className="flex-1" to={`/admin/equipment/edit/${equipment.id}`}>
          <Button className="w-full">Editar</Button>
        </Link>
        <Link className="flex-1" to="/admin/equipment/create">
          <Button className="w-full">Criar outro</Button>
        </Link>
        <Link className="flex-1" to="/admin">
          <Button className="w-full">Voltar ao menu</Button>
        </Link>
      </div>
    </div>
  )
}

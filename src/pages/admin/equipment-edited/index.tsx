import { getEquipment } from '@/api/get-equipment'
import { Button } from '@/components/button'
import { CameraSlash, Check } from '@phosphor-icons/react'
import { useQuery } from '@tanstack/react-query'
import { Link, useParams } from 'react-router-dom'

export function EquipmentEdited() {
  const { id } = useParams()

  const { data: equipment } = useQuery({
    queryKey: ['equipment'],
    queryFn: () => getEquipment(id!),
  })

  if (!equipment) {
    return
  }

  const banner = equipment.photos?.[0]?.link

  return (
    <div className="flex flex-col items-center">
      <h1 className="mx-6 my-5 text-center text-2xl font-semibold md:text-4xl">
        Equipamento editado com sucesso
        <Check weight="bold" className="ml-2 inline text-green-500" />
      </h1>

      <div className="flex w-full flex-col shadow-xl shadow-black/40 md:w-60">
        {banner ? (
          <img
            className="aspect-square w-full object-cover"
            src={banner}
            alt="bomba de dregs"
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
      <div className="mt-6 flex w-[36rem] gap-2">
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

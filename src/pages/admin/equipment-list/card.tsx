import { Equipment } from '@/types/Equipment'
import { CameraSlash } from '@phosphor-icons/react'

import { Link } from 'react-router-dom'
import { DeleteWarning } from './delete-warning'
import { toast } from 'react-toastify'
import { useMutation } from '@tanstack/react-query'
import { Button } from '@/components/button'
import { deleteEquipment } from '@/api/delete-equipment'
import { queryClient } from '@/lib/query-client'

interface cardProps {
  equipment: Equipment
}

export function Card({ equipment }: cardProps) {
  const banner = equipment.photos?.[0]?.link

  const { mutateAsync: deleteEquipmentFn } = useMutation({
    mutationFn: deleteEquipment,
    onSuccess() {
      queryClient.setQueryData<Equipment[]>(['equipments'], (oldData) => {
        const newData = oldData?.filter(({ id }) => id !== equipment.id)
        return newData
      })
    },
  })

  async function handleDeleteEquipment() {
    try {
      await deleteEquipmentFn(equipment.id)

      toast.success('Equipamento deletado com sucesso.')
    } catch (err) {
      console.error(err)

      toast.error('Erro ao deletar o equipamento.')
    }
  }

  return (
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
        <div className="mt-2 flex gap-2 text-center font-semibold text-white">
          <Link to={`/admin/equipment/edit/${equipment.id}`}>
            <Button>Editar</Button>
          </Link>

          <DeleteWarning deleteEquipment={handleDeleteEquipment} />
        </div>
      </div>
    </div>
  )
}

import { useParams } from 'react-router-dom'

import { useEffect, useState } from 'react'
import { Equipment } from '@/types/Equipment'
import { api } from '@/lib/axios'

export function DetailsEquipamento() {
  const { id } = useParams()

  const [equipment, setEquipment] = useState<Equipment>()

  useEffect(() => {
    if (id) {
      api.get(`equipment/${id}`).then((response) => {
        setEquipment(response.data.equipment)
      })
    }
  }, [id])

  if (!equipment) {
    return <h1>Equipamento não encontrado</h1>
  }

  return (
    <div className="my-6 flex flex-col gap-4 px-8 md:mt-11 md:flex-row md:gap-20 md:px-28">
      {/* TODO: tratativa para falta de fotos */}

      <div className="flex h-full flex-1 flex-col gap-4">
        <h1 className="text-3xl font-semibold">{equipment.name}</h1>
      </div>
    </div>
  )
}

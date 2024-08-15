import { Button } from '@/components/button'
import { Equipment } from '@/types/Equipment'
import { CameraSlash } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'

interface MarkerEquipmentProps {
  equipment: Equipment
}

export function MarkerEquipment({ equipment }: MarkerEquipmentProps) {
  const banner = equipment.photos?.[0].link

  return (
    <div>
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
      <div className="flex flex-col gap-2 p-6">
        <span className="text-lg font-medium">{equipment.name}</span>
        <span className="text-sm font-medium text-gray-500">
          {equipment.tag}
        </span>
        {equipment.description && (
          <p className="text-sm text-gray-500">
            <span className="text-black">Descrição: </span>
            {equipment.description}
          </p>
        )}
        <Link to={`/equipment/${equipment.id}`} className="mx-auto mt-5">
          <Button className="">Mais detalhes</Button>
        </Link>
      </div>
    </div>
  )
}

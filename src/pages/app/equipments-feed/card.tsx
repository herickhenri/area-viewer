import { Link } from 'react-router-dom'
import { CameraSlash } from '@phosphor-icons/react'
import { Equipment } from '@/types/Equipment'
import { Button } from '@/components/button'

interface cardProps {
  equipment: Equipment
}

export function Card({ equipment }: cardProps) {
  const banner = equipment.photos?.[0]?.link
  return (
    <div className="flex w-full flex-col overflow-hidden rounded-lg bg-white text-gray-600 shadow-lg md:w-60">
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
        <span className="text-xs font-medium text-blue-600">
          {equipment.tag}
        </span>
        <h2 className="flex-1 text-lg font-semibold">{equipment.name}</h2>
        <Link to={`/equipment/${equipment.id}`}>
          <Button className="w-full">Mais informações</Button>
        </Link>
      </div>
    </div>
  )
}

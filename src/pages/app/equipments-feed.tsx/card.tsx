import { Link } from 'react-router-dom'
import { CameraSlash } from '@phosphor-icons/react'
import { Equipment } from '@/types/Equipment'

interface CardEquipamentoProps {
  equipment: Equipment
}

export function Card({ equipment }: CardEquipamentoProps) {
  const banner = equipment.photos?.[0]?.link
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
        <Link
          className="mt-2 block w-full rounded bg-green-700 px-4 py-3 text-center font-semibold text-white transition-colors hover:bg-green-800"
          to={`/equipment/${equipment.id}`}
        >
          Mais informações
        </Link>
      </div>
    </div>
  )
}

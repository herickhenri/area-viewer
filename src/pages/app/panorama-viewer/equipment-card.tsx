import { CameraSlash } from '@phosphor-icons/react'
import { Equipment } from '@/types/Equipment'
import { Button } from '@/components/button'

interface equipmentCardProps {
  equipment: Equipment
}

export function EquipmentCard({ equipment }: equipmentCardProps) {
  console.log(equipment)
  const banner = equipment.photos?.[0]?.link
  console.log(banner)
  return (
    <div
      id={equipment.id}
      className="flex w-60 flex-col bg-white text-black shadow-xl shadow-black/40 [text-shadow:none]"
    >
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
        <a href={`/equipment/${equipment.id}`}>
          <Button className="w-full px-0">Mais informações</Button>
        </a>
      </div>
    </div>
  )
}

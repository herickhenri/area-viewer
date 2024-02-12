import { CameraSlash } from '@phosphor-icons/react'
import { Equipment } from '@/types/Equipment'
import { Button } from '@/components/button'
import { useNavigate } from 'react-router-dom'

interface equipmentCardProps {
  equipment: Equipment
}

export function EquipmentCard({ equipment }: equipmentCardProps) {
  const navigate = useNavigate()

  function redirectEquipment() {
    // Foi utilizado essa função ao invez do componente <Link> por ele nao funcionar nesse caso no site mobile
    navigate(`/equipment/${equipment.id}`)
  }

  const banner = equipment.photos?.[0]?.link

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
        <Button className="w-full px-0" onClick={redirectEquipment}>
          Mais informações
        </Button>
      </div>
    </div>
  )
}

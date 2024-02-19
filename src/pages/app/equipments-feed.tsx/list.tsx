import { Equipment } from '@/types/Equipment'
import { Card } from './card'

interface listProps {
  equipments: Equipment[]
}

export function List({ equipments }: listProps) {
  if (equipments.length === 0) {
    return (
      <span className="block w-screen text-center text-lg font-medium text-black/50">
        Nenhum equipamento encontrado.
      </span>
    )
  }

  return (
    <div className="mb-5 flex flex-wrap justify-center gap-5 px-6">
      {equipments.map((equipment) => (
        <Card key={equipment.tag} equipment={equipment} />
      ))}
    </div>
  )
}

import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getEquipment } from '@/api/get-equipment'
import { CarouselPhotos } from './carousel-photos'
import { MapPin } from '@phosphor-icons/react'
import { Button } from '@/components/button'

export function EquipmentDetails() {
  const { id } = useParams()

  const { data: equipment } = useQuery({
    queryKey: ['equipment'],
    queryFn: () => getEquipment(id!),
  })

  if (!equipment) {
    return <h1>Equipamento não encontrado</h1>
  }

  const sources = equipment.photos?.map((photo) => photo.link)
  return (
    <div className="my-6 flex flex-col gap-4 px-8 md:mt-11 md:flex-row md:gap-20 md:px-28">
      {/* TODO: tratativa para falta de fotos */}
      {sources && <CarouselPhotos sources={sources} />}
      <div className="flex h-full flex-1 flex-col gap-4">
        <h1 className="text-3xl font-semibold">{equipment.name}</h1>

        <div>
          <span className="text-sm font-semibold">Tag:</span>
          <span className="block">{equipment.tag}</span>
        </div>

        <div>
          <span className="text-sm font-semibold">Descrição:</span>
          <p>{equipment.description}</p>
        </div>

        <Button className="mx-0 gap-2">
          <MapPin size={24} />
          Ver na área
        </Button>
      </div>
    </div>
  )
}

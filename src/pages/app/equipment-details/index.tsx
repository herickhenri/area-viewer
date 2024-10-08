import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getEquipment } from '@/api/get-equipment'
import { CarouselPhotos } from './carousel-photos'
import { CameraSlash, MapPin } from '@phosphor-icons/react'
import { Button } from '@/components/button'
import { SkeletonLoading } from './skeleton-loading'
import { NoteDetail } from './note-detail'

export function EquipmentDetails() {
  const { id } = useParams()

  const { data: equipment, isLoading } = useQuery({
    queryKey: ['equipment', id],
    queryFn: () => getEquipment(id!),
  })

  if (isLoading || !equipment) {
    return <SkeletonLoading />
  }

  const sources = equipment.photos?.map((photo) => photo.link)
  return (
    <div className="my-6 flex flex-col gap-4 px-8 md:mt-11 md:flex-row md:gap-20 md:px-28">
      {sources && sources.length > 0 ? (
        <CarouselPhotos sources={sources} />
      ) : (
        <div className="flex aspect-square flex-1 items-center justify-center bg-slate-300 opacity-50 md:max-w-[30vw]">
          <CameraSlash size={32} />
        </div>
      )}
      <div className="flex h-full flex-col gap-4">
        <h1 className="text-3xl font-semibold">{equipment.name}</h1>

        <div>
          <span className="text-sm font-semibold">Tag:</span>
          <span className="block">{equipment.tag}</span>
        </div>

        <div>
          <span className="text-sm font-semibold">Descrição:</span>
          <p>{equipment.description}</p>
        </div>

        {!!equipment.notes?.length && (
          <div>
            <div className="flex items-center gap-2">
              <div className=" h-3 w-3 rounded-full bg-yellow-400" />
              <span className="text-sm font-semibold">Notas em aberto:</span>
            </div>
            {equipment.notes?.map((note) => (
              <span key={note.id}>
                - {note.description} (<NoteDetail note={note} />)
              </span>
            ))}
          </div>
        )}

        {!!equipment.panoramas?.length && (
          <Link
            to={`/panoramas/viewer?nodeId=${equipment.panoramas[0].panorama_id}&equipmentId=${equipment.id}`}
          >
            <Button className="mx-0 gap-2">
              <MapPin size={24} />
              Ver na área
            </Button>
          </Link>
        )}
      </div>
    </div>
  )
}

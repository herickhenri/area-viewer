import { CameraSlash } from '@phosphor-icons/react'
import { forwardRef } from 'react'
import { Equipment } from '@/types/Equipment'
import { Button } from '@/components/button'

interface markersProps {
  equipment: Equipment
}

export default forwardRef<HTMLDivElement, markersProps>(function MarkersTooltip(
  { equipment }: markersProps,
  ref,
) {
  const banner = equipment.photos?.[0].link

  return (
    <div
      className="mx-auto flex w-60 flex-col border-2 border-solid border-white bg-white font-sans text-black shadow-xl shadow-black/40 [text-shadow:none]"
      ref={ref}
    >
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
        <h2 className="flex-1 text-lg font-semibold text-gray-600">
          {equipment.name}
        </h2>
        <a href={`/equipment/${equipment.id}`}>
          <Button className="mx-auto">Mais informações</Button>
        </a>
      </div>
    </div>
  )
})

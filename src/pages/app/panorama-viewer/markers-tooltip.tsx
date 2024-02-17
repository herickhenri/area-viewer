import { CameraSlash } from '@phosphor-icons/react'
import { forwardRef } from 'react'
import { Equipment } from '@/types/Equipment'

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
      className="mx-auto flex w-60 flex-col border-2 border-solid border-white bg-white text-black shadow-xl shadow-black/40 [text-shadow:none]"
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
        <span className="text-xs">{equipment.tag}</span>
        <h2 className="flex-1 text-lg font-semibold">{equipment.name}</h2>
        <a
          href={`/equipment/${equipment.id}`}
          className="flex w-full items-center justify-center rounded bg-blue-800 py-2 text-lg font-medium text-white transition-colors hover:bg-blue-900 disabled:cursor-not-allowed disabled:bg-blue-900 disabled:opacity-80"
        >
          Mais informações
        </a>
      </div>
    </div>
  )
})

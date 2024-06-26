import { CameraSlash, MapPin, X } from '@phosphor-icons/react'
import { forwardRef } from 'react'
import { Equipment } from '@/types/Equipment'
import { usePanoramaViewer } from '@/context/panorama-viewer-provider'

interface markersProps {
  equipment: Equipment
}

export default forwardRef<HTMLDivElement, markersProps>(function Markers(
  { equipment }: markersProps,
  ref,
) {
  const { changeEquipmentId, selectedEquipmentId } = usePanoramaViewer()

  const banner = equipment.photos?.[0].link

  return (
    <div ref={ref} className="relative">
      <MapPin
        size={32}
        fill="red"
        weight="fill"
        onClick={() => changeEquipmentId(equipment.id)}
        className="cursor-pointer"
      />

      <div
        className={`${selectedEquipmentId === equipment.id ? 'block' : 'hidden'} absolute left-1/2 top-9 flex w-60 -translate-x-1/2 flex-col border-2 border-solid border-white bg-white text-black shadow-xl shadow-black/40 [text-shadow:none]`}
      >
        <X
          size={20}
          weight="bold"
          className="absolute right-1 top-1 cursor-pointer rounded-full bg-white p-1 text-red-500"
          onClick={() => changeEquipmentId(null)}
        />

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
            className="flex w-full items-center justify-center rounded bg-blue-500 py-2 text-lg font-medium text-white transition-colors hover:bg-blue-400 disabled:cursor-not-allowed disabled:bg-blue-500/70 disabled:opacity-80"
          >
            Mais informações
          </a>
        </div>
      </div>
    </div>
  )
})

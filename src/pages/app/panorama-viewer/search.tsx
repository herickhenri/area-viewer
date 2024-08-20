import { Equipment } from '@/types/Equipment'
import { Panorama } from '@/types/Panorama'
import { searchEquipmentsFilter } from '@/utils/search-equipments-filter'
import { searchPanoramasFilter } from '@/utils/search-panoramas-filter'
import {
  MagnifyingGlass,
  MapPin,
  Panorama as PanoramaIcon,
} from '@phosphor-icons/react'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'

interface SearchProps {
  panoramas?: Panorama[]
  equipments?: Equipment[]
}

export function Search({ panoramas, equipments }: SearchProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [, setSearchParams] = useSearchParams()

  const filteredPanoramas =
    panoramas &&
    searchPanoramasFilter({ panoramas, search }).map(
      (panorama) => ({ ...panorama, type: 'panorama' }) as const,
    )
  const filteredEquipments =
    equipments &&
    searchEquipmentsFilter({ equipments, search }).map(
      (equipment) => ({ ...equipment, type: 'equipment' }) as const,
    )

  const options = [
    ...(filteredPanoramas || []),
    ...(filteredEquipments || []),
  ].slice(0, 5)

  function navigateToEquipment(equipment: Equipment) {
    if (!equipment.panoramas?.length) {
      toast.error('Este equipamento não está linkado a nenhum panorama.')

      return
    }

    setSearchParams((state) => {
      equipment.panoramas &&
        state.set('nodeId', equipment.panoramas?.[0].panorama_id)

      state.set('equipmentId', equipment.id)

      return state
    })

    setSearch(equipment.name)
  }

  function navigateToPanorama(panorama: Panorama) {
    setSearchParams((state) => {
      state.set('nodeId', panorama.id)

      return state
    })

    setSearch(panorama.name)
  }

  function handleBlur() {
    setTimeout(() => {
      setIsOpen(false)
    }, 100)
  }

  return (
    <div className="group absolute left-8 top-6 z-[60] flex w-80 flex-col overflow-hidden rounded-2xl bg-white">
      <div className="flex items-center gap-2 rounded-full border-b border-transparent bg-white px-4 py-2 shadow-lg focus-within:rounded-b-none focus-within:border-slate-200 focus-within:shadow-none">
        <input
          type="text"
          className="flex-1 outline-none"
          placeholder="Pesquisar"
          value={search}
          onFocus={() => setIsOpen(true)}
          onBlur={handleBlur}
          onChange={(e) => setSearch(e.target.value)}
        />
        <MagnifyingGlass />
      </div>
      <ul className={`${isOpen ? 'block' : 'hidden'} text-sm`}>
        {options.length === 0 ? (
          <span className="block w-full px-3 py-2 text-center text-sm text-slate-500">
            Nenhum equipamento encontrado
          </span>
        ) : (
          options.map((option) =>
            option.type === 'equipment' ? (
              <li
                key={option.id}
                className="flex cursor-pointer items-center gap-2 px-3 py-2 hover:bg-slate-100"
                onClick={() => navigateToEquipment(option)}
              >
                <MapPin size={16} className="min-w-4 text-slate-600" />
                <span className="truncate">{option.name}</span>
              </li>
            ) : (
              <li
                key={option.id}
                className="flex cursor-pointer items-center gap-2 px-3 py-2 hover:bg-slate-100"
                onClick={() => navigateToPanorama(option)}
              >
                <PanoramaIcon size={16} className="min-w-4 text-slate-600" />
                <span className="truncate">{option.name}</span>
              </li>
            ),
          )
        )}
      </ul>
    </div>
  )
}

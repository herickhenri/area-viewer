import { useCallback, useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getPanoramas } from '@/api/get-panoramas'
import { useViewer } from '@/hooks/use-viewer'
import { useUpdateImageQuality } from '@/hooks/use-update-image-quality'
import { CaretLeft, MagnifyingGlass } from '@phosphor-icons/react'
import { getEquipments } from '@/api/get-equipments'
import { Equipment } from '@/types/Equipment'
import { useSearchParams } from 'react-router-dom'
import { MarkerEquipment } from './marker-equipment'
import { Note } from '@/types/Note'
import { getNotes } from '@/api/get-notes'
import { MarkerNote } from './marker-note'

type EquipmentMarker = {
  equipment: Equipment
  type: 'equipment'
}

type NoteMarker = {
  note: Note
  type: 'note'
}

export function PanoramaViewer() {
  const [onSidebar, setOnSidebar] = useState(false)
  const [selectedMarker, setSelectedMarker] = useState<
    null | EquipmentMarker | NoteMarker
  >(null)
  const [searchParams, setSearchParams] = useSearchParams()

  const { data: panoramas } = useQuery({
    queryKey: ['panoramas'],
    queryFn: getPanoramas,
    staleTime: Infinity,
  })
  const { data: equipments } = useQuery({
    queryKey: ['equipments'],
    queryFn: getEquipments,
  })
  const { data: notes } = useQuery({
    queryKey: ['notes'],
    queryFn: getNotes,
  })

  const { viewerRef, virtualTour, markersPlugin, viewer } = useViewer(panoramas)
  const markers = markersPlugin?.getMarkers()

  useUpdateImageQuality({ panoramas, viewer, virtualTour })

  const handleMarker = useCallback(
    (markerId: string) => {
      const equipmentsMarker: EquipmentMarker[] | undefined = equipments?.map(
        (equipment) => ({ equipment, type: 'equipment' }),
      )
      const notesMarker: NoteMarker[] | undefined = notes?.map((note) => ({
        note,
        type: 'note',
      }))
      const markersList = [...(equipmentsMarker || []), ...(notesMarker || [])]

      const marker = markersList.find(
        (marker) =>
          (marker.type === 'equipment' && marker.equipment.id === markerId) ||
          (marker.type === 'note' && marker.note.id === markerId),
      )

      if (marker) {
        setSelectedMarker(marker)
        setOnSidebar(true)
      }
    },
    [equipments, notes],
  )

  useEffect(() => {
    if (!markersPlugin || !markers?.length) return

    const equipmentFocusId = searchParams.get('equipmentId')

    const markerFocus = markers.find((marker) => marker.id === equipmentFocusId)

    if (markerFocus) {
      markersPlugin.gotoMarker(markerFocus.id)
      setOnSidebar(true)
      handleMarker(markerFocus.id)

      setSearchParams((state) => {
        state.delete('equipmentId')

        return state
      })
    }
  }, [markers, searchParams, setSearchParams, markersPlugin, handleMarker])

  useEffect(() => {
    if (!markersPlugin) return

    // It was necessary to use any for the event. Because addEventListener was accepting the function's typing, but removeEventListener was not.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function handleSelectMarker(event: any) {
      const markerId: string = event.marker.id
      handleMarker(markerId)
    }

    markersPlugin.addEventListener('select-marker', handleSelectMarker)

    return () => {
      markersPlugin.removeEventListener('select-marker', handleSelectMarker)
    }
  }, [markersPlugin, handleMarker])

  return (
    <div>
      <div
        className={`${onSidebar ? '' : '-translate-x-full'} fixed left-0 top-0 z-50 h-screen w-96 bg-slate-100 shadow-lg transition-transform`}
      >
        <div className="absolute left-1/2 top-6 flex w-[90%] -translate-x-1/2 items-center gap-2 rounded-full bg-white px-4 py-2 shadow-lg">
          <input
            type="text"
            className="flex-1 outline-none"
            placeholder="Pesquisar"
          />
          <MagnifyingGlass />
        </div>
        {selectedMarker?.type === 'equipment' && (
          <MarkerEquipment equipment={selectedMarker.equipment} />
        )}
        {selectedMarker?.type === 'note' && (
          <MarkerNote note={selectedMarker.note} />
        )}

        <button
          className="absolute -right-0 top-1/2 -translate-y-1/2 translate-x-full rounded-r bg-slate-100 px-0.5 py-2 text-xl font-bold text-slate-500 transition-colors hover:bg-slate-200"
          onClick={() => setOnSidebar((state) => !state)}
        >
          <CaretLeft
            size={20}
            className={`${onSidebar ? '' : 'rotate-180'} block transition-transform`}
          />
        </button>
      </div>
      <div className="h-screen w-full" ref={viewerRef}></div>
    </div>
  )
}

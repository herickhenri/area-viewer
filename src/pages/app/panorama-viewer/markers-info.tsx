import { CaretLeft } from '@phosphor-icons/react'
import { MarkerEquipment } from './marker-equipment'
import { MarkerNote } from './marker-note'
import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Note } from '@/types/Note'
import { Equipment } from '@/types/Equipment'
import { MarkersPlugin } from '@photo-sphere-viewer/markers-plugin'
import { Panorama } from '@/types/Panorama'
import { Search } from './search'

type EquipmentMarker = {
  equipment: Equipment
  type: 'equipment'
}

type NoteMarker = {
  note: Note
  type: 'note'
}

interface MarkersInfo {
  equipments?: Equipment[]
  notes?: Note[]
  panoramas?: Panorama[]
  markersPlugin: MarkersPlugin
}

export function MarkersInfo({
  equipments,
  notes,
  markersPlugin,
  panoramas,
}: MarkersInfo) {
  const [onSidebar, setOnSidebar] = useState(false)

  const [searchParams, setSearchParams] = useSearchParams()
  const [selectedMarker, setSelectedMarker] = useState<
    null | EquipmentMarker | NoteMarker
  >(null)
  const markers = markersPlugin.getMarkers()

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
    [equipments, notes, setOnSidebar],
  )

  useEffect(() => {
    const equipmentFocusId = searchParams.get('equipmentId')
    const markerFocus = markers.find((marker) => marker.id === equipmentFocusId)
    if (markerFocus) {
      markersPlugin.gotoMarker(markerFocus.id)
      handleMarker(markerFocus.id)

      setSearchParams((state) => {
        state.delete('equipmentId')

        return state
      })
    }
  }, [markersPlugin, handleMarker, searchParams, markers, setSearchParams])

  useEffect(() => {
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
    <>
      <Search equipments={equipments} panoramas={panoramas} />
      {selectedMarker && (
        <div
          className={`${onSidebar ? '' : '-translate-x-full'} fixed left-0 top-0 z-50 h-screen w-96 bg-slate-100 shadow-lg transition-transform`}
        >
          {selectedMarker.type === 'equipment' && (
            <MarkerEquipment equipment={selectedMarker.equipment} />
          )}
          {selectedMarker.type === 'note' && (
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
      )}
    </>
  )
}

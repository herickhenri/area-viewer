import { Equipment } from '@/types/Equipment'
import { Note } from '@/types/Note'
import { MarkersPlugin } from '@photo-sphere-viewer/markers-plugin'
import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

type EquipmentMarker = {
  equipment: Equipment
  type: 'equipment'
}

type NoteMarker = {
  note: Note
  type: 'note'
}

interface useMarkersProps {
  equipments?: Equipment[]
  notes?: Note[]
  markersPlugin?: MarkersPlugin
  changeOpenSidebar: (osSidebar: boolean) => void
}

export function useMarkers({
  equipments,
  notes,
  markersPlugin,
  changeOpenSidebar,
}: useMarkersProps) {
  const [searchParams, setSearchParams] = useSearchParams()
  const [selectedMarker, setSelectedMarker] = useState<
    null | EquipmentMarker | NoteMarker
  >(null)
  const markers = markersPlugin?.getMarkers()

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
        changeOpenSidebar(true)
      }
    },
    [equipments, notes, changeOpenSidebar],
  )

  useEffect(() => {
    if (!markersPlugin || !markers?.length) return

    const equipmentFocusId = searchParams.get('equipmentId')

    const markerFocus = markers.find((marker) => marker.id === equipmentFocusId)

    if (markerFocus) {
      markersPlugin.gotoMarker(markerFocus.id)
      changeOpenSidebar(true)
      handleMarker(markerFocus.id)

      setSearchParams((state) => {
        state.delete('equipmentId')

        return state
      })
    }
  }, [
    markers,
    searchParams,
    setSearchParams,
    markersPlugin,
    handleMarker,
    changeOpenSidebar,
  ])

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

  return { selectedMarker }
}

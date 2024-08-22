import { Panorama } from '@/types/Panorama'
import { VirtualTourNode } from '@photo-sphere-viewer/virtual-tour-plugin'
import { createMarkers, CreateMarkersProps } from './create-markers'
import { Equipment } from '@/types/Equipment'
import { Note } from '@/types/Note'

interface CreateNodesProps {
  panoramas: Panorama[]
  equipments?: Equipment[]
  notes?: Note[]
}

export function createNodes({
  panoramas,
  equipments,
  notes,
}: CreateNodesProps) {
  const nodes = panoramas.map((panorama) => {
    const links = panorama.connections_from?.map(
      ({ connected_to_id, yaw, pitch }) => ({
        nodeId: connected_to_id,
        position: { yaw, pitch },
      }),
    )

    const equipmentsMarkers = panorama.equipments?.map(
      ({ yaw, pitch, equipment_id }) => {
        const equipmentName = equipments?.find(
          ({ id }) => id === equipment_id,
        )?.name

        const marker: CreateMarkersProps = {
          yaw,
          pitch,
          id: equipment_id,
          name: equipmentName || 'Equipamento',
          type: 'equipment',
        }

        return marker
      },
    )
    const notesMarkers = panorama.notes?.map(({ yaw, pitch, note_id }) => {
      const noteName = notes?.find(({ id }) => id === note_id)?.description

      const marker: CreateMarkersProps = {
        yaw,
        pitch,
        id: note_id,
        name: noteName || 'nota',
        type: 'note',
      } as const

      return marker
    })
    const allMarkers = [...(notesMarkers || []), ...(equipmentsMarkers || [])]

    const node: VirtualTourNode = {
      id: panorama.id,
      panorama: `${panorama.images[0].link}?no-cache-please`,
      name: panorama.name,
      links,
      markers: createMarkers(allMarkers),
    }

    return node
  })

  return nodes
}

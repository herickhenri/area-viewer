import { Panorama } from '@/types/Panorama'
import { VirtualTourNode } from '@photo-sphere-viewer/virtual-tour-plugin'
import { createMarkers, CreateMarkersProps } from './create-markers'

export function createNodes(panoramas: Panorama[]) {
  const nodes = panoramas.map((panorama) => {
    const links = panorama.connections_from?.map(
      ({ connected_to_id, yaw, pitch }) => ({
        nodeId: connected_to_id,
        position: { yaw, pitch },
      }),
    )

    const equipmentsMarkers = panorama.equipments?.map(
      ({ yaw, pitch, equipment_id }) => {
        const marker: CreateMarkersProps = {
          yaw,
          pitch,
          id: equipment_id,
          name: 'equipment | mudar',
          type: 'equipment',
        }

        return marker
      },
    )
    const notesMarkers = panorama.notes?.map(({ yaw, pitch, note_id }) => {
      const marker: CreateMarkersProps = {
        yaw,
        pitch,
        id: note_id,
        name: 'note | mudar',
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

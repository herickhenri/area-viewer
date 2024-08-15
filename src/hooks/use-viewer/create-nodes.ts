import { Panorama } from '@/types/Panorama'
import { VirtualTourNode } from '@photo-sphere-viewer/virtual-tour-plugin'
import { createMarkers, CreateMarkersProps } from './create-markers'

export function createNodes(panoramas: Panorama[]) {
  const nodes = panoramas.map((panorama) => {
    const links = panorama.links?.map((link) => ({
      nodeId: link.panorama_connect_id,
      position: { textureX: link.coord_x, textureY: link.coord_y },
    }))

    const equipmentsMarkers = panorama.equipments?.map(
      ({ coord_x, coord_y, equipment_id }) => {
        const marker: CreateMarkersProps = {
          coord_x,
          coord_y,
          id: equipment_id,
          name: 'equipment | mudar',
          type: 'equipment',
        }

        return marker
      },
    )
    const notesMarkers = panorama.notes?.map(
      ({ coord_x, coord_y, note_id }) => {
        const marker: CreateMarkersProps = {
          coord_x,
          coord_y,
          id: note_id,
          name: 'note | mudar',
          type: 'note',
        } as const

        return marker
      },
    )
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

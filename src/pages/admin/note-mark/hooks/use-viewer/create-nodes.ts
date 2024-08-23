import { Panorama } from '@/types/Panorama'
import { VirtualTourNode } from '@photo-sphere-viewer/virtual-tour-plugin'

interface CreateNodesProps {
  panoramas: Panorama[]
}

export function createNodes({ panoramas }: CreateNodesProps) {
  const nodes = panoramas.map((panorama) => {
    const links = panorama.connections_from?.map(
      ({ connected_to_id, yaw, pitch }) => ({
        nodeId: connected_to_id,
        position: { yaw, pitch },
      }),
    )

    const node: VirtualTourNode = {
      id: panorama.id,
      panorama: `${panorama.images[panorama.images.length - 1].link}?no-cache-please`,
      name: panorama.name,
      links,
    }

    return node
  })

  return nodes
}

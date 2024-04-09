import { Panorama } from '@/types/Panorama'

export function createNodes(panoramas: Panorama[]) {
  const nodes = panoramas.map((panorama) => {
    const links = panorama.links?.map((link) => ({
      nodeId: link.panorama_connect_id,
      position: { textureX: link.coord_x, textureY: link.coord_y },
    }))

    const node = {
      id: panorama.id,
      panorama: panorama.image_link,
      name: panorama.name,
      links,
    }

    return node
  })

  return nodes
}

import { MarkingWithRef } from './photo-sphere'

export function createMarkers(markings: MarkingWithRef[]) {
  const markers = markings.map(({ coord_x, coord_y, equipment, ref }) => ({
    id: equipment.id,
    position: {
      textureX: coord_x,
      textureY: coord_y - 16,
    },
    content: ref?.current?.outerHTML,
    size: { width: 32, height: 32 },
    image: '/pin-red.svg',
    listContent: equipment.name,
  }))

  return markers
}

import { MarkingWithRef } from '.'

export function createMarkers(markings: MarkingWithRef[]) {
  const markers = markings.map(({ coord_x, coord_y, equipment_id, ref }) => ({
    id: equipment_id,
    position: {
      textureX: coord_x,
      textureY: coord_y - 32,
    },
    content: ref?.current?.outerHTML,
    size: { width: 32, height: 32 },
    image: '/pin-red.svg',
    listContent: 'equipment',
  }))

  return markers
}

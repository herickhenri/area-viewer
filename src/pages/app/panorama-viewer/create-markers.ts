import { MarkingWithRef } from '.'

const content = {
  equipment: {
    icon: '/pin-red.svg',
    title: 'equipment',
  },
  note: {
    icon: '/alert-icon.png',
    title: 'Nota',
  },
}

export function createMarkers(markings: MarkingWithRef[]) {
  const markers = markings.map(({ id, coord_x, coord_y, type, ref }) => ({
    id,
    position: {
      textureX: coord_x,
      textureY: coord_y - 32,
    },
    content: ref?.current?.outerHTML,
    size: { width: 32, height: 32 },
    image: content[type].icon,
    listContent: content[type].title,
  }))

  return markers
}

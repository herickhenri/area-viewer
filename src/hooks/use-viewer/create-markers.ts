import { MarkerConfig } from '@photo-sphere-viewer/markers-plugin'

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

export type CreateMarkersProps = {
  name: string
  coord_x: number
  coord_y: number
  id: string
  type: 'equipment' | 'note'
}

export function createMarkers(markers: CreateMarkersProps[]) {
  const markersConfig: MarkerConfig[] = markers.map(
    ({ id, coord_x, coord_y, type, name }) => ({
      id,
      position: {
        textureX: coord_x,
        textureY: coord_y,
      },
      tooltip: name,
      size: { width: 32, height: 32 },
      image: content[type].icon,
      listContent: content[type].title,
    }),
  )

  return markersConfig
}

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
  yaw: number
  pitch: number
  id: string
  type: 'equipment' | 'note'
}

export function createMarkers(markers: CreateMarkersProps[]) {
  const markersConfig: MarkerConfig[] = markers.map(
    ({ id, yaw, pitch, type, name }) => ({
      id,
      position: {
        yaw,
        pitch,
      },
      size: { width: 24, height: 24 },
      anchor: 'bottom center',
      image: content[type].icon,
      listContent: content[type].title,
      tooltip: name,
    }),
  )

  return markersConfig
}

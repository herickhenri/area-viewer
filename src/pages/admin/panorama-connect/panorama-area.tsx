import { useEffect } from 'react'
import { useViewer } from './use-viewer'
import { Panorama } from '@/types/Panorama'
import { ClickData } from '@photo-sphere-viewer/core'
import { MarkerConfig } from '@photo-sphere-viewer/markers-plugin'
import { useSearchParams } from 'react-router-dom'

type Position = {
  yaw: number
  pitch: number
}

interface PanoramaAreaProps {
  panorama: Panorama
  panoramas: Panorama[]
  value: Position
  onChangePosition: (value: Position) => void
}

export function PanoramaArea({
  panorama,
  panoramas,
  onChangePosition,
  value,
}: PanoramaAreaProps) {
  const [searchParams] = useSearchParams()
  const mainPanoramaId = searchParams.get('main_panorama_id')
  const secondaryPanoramaId = searchParams.get('secondary_panorama_id')

  console.log(value)

  const { viewerRef, viewer, markersPlugin } = useViewer(panorama)

  useEffect(() => {
    if (!viewer) return

    viewer.setPanorama(
      `${panorama.images[panorama.images.length - 1].link}?no-cache-please`,
    )
  }, [panorama, viewer])

  useEffect(() => {
    if (!viewer || !markersPlugin) return

    // It was necessary to use any for the event. Because addEventListener was accepting the function's typing, but removeEventListener was not.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function handleViewerClick(event: any) {
      const { data }: { data: ClickData } = event
      onChangePosition({ yaw: data.yaw, pitch: data.pitch })
    }

    viewer.addEventListener('click', handleViewerClick)

    return () => {
      viewer.removeEventListener('click', handleViewerClick)
    }
  }, [markersPlugin, viewer, onChangePosition])

  const markers: MarkerConfig[] | undefined = panorama.connections_from?.map(
    ({ connected_to_id, yaw, pitch }) => {
      const panoramaName = panoramas.find(
        ({ id }) => id === connected_to_id,
      )?.name
      return {
        id: connected_to_id,
        position: { yaw, pitch },
        image: '/arrow.svg',
        size: { width: 48, height: 48 },
        tooltip: panoramaName ?? '',
      }
    },
  )

  const markersWithTheCurrentOne = markers?.filter(
    (marker) =>
      marker.id !== mainPanoramaId && marker.id !== secondaryPanoramaId,
  )

  const marker = value && [
    {
      id: `#${Math.random()}`,
      position: { yaw: value.yaw, pitch: value.pitch },
      image: '/arrow-red.svg',
      size: { width: 48, height: 48 },
      tooltip: '',
    },
  ]

  markersPlugin?.setMarkers([
    ...(marker || []),
    ...(markersWithTheCurrentOne || []),
  ])

  return <div className="h-96 w-full" ref={viewerRef} />
}

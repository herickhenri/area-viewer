import { useEffect } from 'react'
import { useViewer } from './use-viewer'
import { ClickData } from '@photo-sphere-viewer/core'
import { MarkerPosition } from './equipment-markers'
import { useFormContext } from 'react-hook-form'
import { CreatePanoramaFormData } from '.'
import { MarkerConfig } from '@photo-sphere-viewer/markers-plugin'
import { Equipment } from '@/types/Equipment'

interface PanoramaAreaProps {
  source: string
  markerPosition: MarkerPosition | null
  equipments: Equipment[]
  changeMarkerPosition: (markerPosition: MarkerPosition | null) => void
}

export function PanoramaArea({
  source,
  markerPosition,
  changeMarkerPosition,
  equipments,
}: PanoramaAreaProps) {
  const { viewerRef, viewer, markersPlugin } = useViewer(source)
  const { getValues } = useFormContext<CreatePanoramaFormData>()

  const equipmentsMarkers = getValues('equipments')
  const markers: MarkerConfig[] | undefined = equipmentsMarkers?.map(
    ({ equipment_id, pitch, yaw }) => {
      const equipmentName = equipments.find(
        ({ id }) => id === equipment_id,
      )?.name
      return {
        id: equipment_id,
        position: { yaw, pitch },
        image: '/pin-red.svg',
        anchor: 'bottom center',
        size: { width: 24, height: 24 },
        tooltip: equipmentName ?? '',
      }
    },
  )

  useEffect(() => {
    if (!viewer || !markersPlugin) return

    // It was necessary to use any for the event. Because addEventListener was accepting the function's typing, but removeEventListener was not.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function handleViewerClick(event: any) {
      const { data } = event as { data: ClickData }
      if (!data.rightclick) {
        changeMarkerPosition({ yaw: data.yaw, pitch: data.pitch })
      }
    }

    viewer.addEventListener('click', handleViewerClick)

    return () => {
      viewer.removeEventListener('click', handleViewerClick)
    }
  }, [markersPlugin, viewer, changeMarkerPosition])

  useEffect(() => {
    if (!viewer) return

    const isBlobUrl = source.startsWith('blob:')
    isBlobUrl && viewer.setPanorama(source)
  }, [source, viewer])

  const marker = markerPosition && [
    {
      id: `#${Math.random()}`,
      position: { yaw: markerPosition.yaw, pitch: markerPosition.pitch },
      image: '/pin-yellow.svg',
      anchor: 'bottom center',
      size: { width: 24, height: 24 },
      tooltip: '',
    },
  ]
  markersPlugin?.setMarkers([...(marker || []), ...(markers || [])])

  return <div ref={viewerRef} className="h-96 w-full" />
}

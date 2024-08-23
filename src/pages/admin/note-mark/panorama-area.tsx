import { useEffect } from 'react'
import { useViewer } from './hooks/use-viewer'
import { Panorama } from '@/types/Panorama'
import { MarkerConfig } from '@photo-sphere-viewer/markers-plugin'
import { ClickData } from '@photo-sphere-viewer/core'
import { VirtualTourNode } from '@photo-sphere-viewer/virtual-tour-plugin'
import { useFormContext } from 'react-hook-form'
import { CreateNotesMarkerData } from '.'

type Position = {
  yaw: number
  pitch: number
}

interface PanoramaAreaProps {
  currentPanoramaId: string
  panoramas: Panorama[]
  value: Position
  onChange: (value: Position) => void
}

export function PanoramaArea({
  currentPanoramaId,
  panoramas,
  onChange,
}: PanoramaAreaProps) {
  const { setValue } = useFormContext<CreateNotesMarkerData>()

  const { viewerRef, viewer, virtualTourPlugin, markersPlugin } =
    useViewer(panoramas)
  useEffect(() => {
    if (!currentPanoramaId || !virtualTourPlugin) return
    virtualTourPlugin.setCurrentNode(currentPanoramaId)
  }, [currentPanoramaId, virtualTourPlugin])

  useEffect(() => {
    if (!viewer || !markersPlugin) return

    // It was necessary to use any for the event. Because addEventListener was accepting the function's typing, but removeEventListener was not.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function handleViewerClick(event: any) {
      const { data } = event as { data: ClickData }
      if (!data.rightclick) {
        const marker: MarkerConfig = {
          id: 'note',
          position: { yaw: data.yaw, pitch: data.pitch },
          image: '/alert-icon.png',
          size: { width: 24, height: 24 },
        }

        onChange({ yaw: data.yaw, pitch: data.pitch })

        markersPlugin?.setMarkers([marker])
      }
    }

    viewer.addEventListener('click', handleViewerClick)

    return () => {
      viewer.removeEventListener('click', handleViewerClick)
    }
  }, [markersPlugin, viewer, onChange])

  useEffect(() => {
    if (!virtualTourPlugin) return

    function handleNodeChange({ node }: { node: VirtualTourNode }) {
      setValue('panorama_id', node.id)
    }

    virtualTourPlugin.addEventListener('node-changed', handleNodeChange)

    return () => {
      virtualTourPlugin.removeEventListener('node-changed', handleNodeChange)
    }
  }, [virtualTourPlugin, setValue])

  return <div className="h-96 w-full" ref={viewerRef} />
}

import { Viewer } from '@photo-sphere-viewer/core'
import { useEffect, useRef, useState } from 'react'
import {
  VirtualTourNode,
  VirtualTourPlugin,
} from '@photo-sphere-viewer/virtual-tour-plugin'
import { MarkersPlugin } from '@photo-sphere-viewer/markers-plugin'

import '@photo-sphere-viewer/virtual-tour-plugin/index.css'
import '@photo-sphere-viewer/core/index.css'
import '@photo-sphere-viewer/markers-plugin/index.css'
import { useLocation } from 'react-router-dom'
import { Panorama } from '@/types/Panorama'
import { createNodes } from './create-nodes'
import { Equipment } from '@/types/Equipment'
import { Note } from '@/types/Note'

interface UseViewerProps {
  panoramas?: Panorama[]
  equipments?: Equipment[]
  notes?: Note[]
}

export function useViewer({ panoramas, equipments, notes }: UseViewerProps) {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const nodeId = queryParams.get('nodeId')

  const [nodes, setNodes] = useState<VirtualTourNode[] | null>(null)

  const viewerRef = useRef<HTMLDivElement>(null)
  const viewerInstanceRef = useRef<Viewer | null>(null)

  const viewer = viewerInstanceRef.current
  const virtualTour = viewer?.getPlugin<VirtualTourPlugin>(VirtualTourPlugin)
  const markersPlugin = viewer?.getPlugin<MarkersPlugin>(MarkersPlugin)

  useEffect(() => {
    if (!viewerRef.current || !panoramas || viewerInstanceRef.current) {
      return
    }

    const nodesCreated = createNodes({ panoramas, equipments, notes })

    const viewerInstance = new Viewer({
      container: viewerRef.current,
      navbar: false,
      plugins: [
        MarkersPlugin,
        [
          VirtualTourPlugin,
          {
            renderMode: '2d',
            transitionOptions: { showLoader: false },
          },
        ],
      ],
    })
    viewerInstanceRef.current = viewerInstance
    setNodes(nodesCreated)
  }, [viewerRef, panoramas, viewerInstanceRef, nodeId, equipments, notes])

  useEffect(() => {
    if (nodes && nodeId) {
      virtualTour?.setNodes(nodes, nodeId)
    }
  }, [nodes, virtualTour, nodeId])

  // console.log(virtualTour)

  return { viewer, viewerRef, virtualTour, markersPlugin, nodes, setNodes }
}

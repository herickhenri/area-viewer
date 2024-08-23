import { Viewer } from '@photo-sphere-viewer/core'
import { useEffect, useRef, useState } from 'react'
import { MarkersPlugin } from '@photo-sphere-viewer/markers-plugin'

import '@photo-sphere-viewer/virtual-tour-plugin/index.css'
import '@photo-sphere-viewer/core/index.css'
import '@photo-sphere-viewer/markers-plugin/index.css'
import { createNodes } from './create-nodes'
import { Panorama } from '@/types/Panorama'
import { VirtualTourPlugin } from '@photo-sphere-viewer/virtual-tour-plugin'

export function useViewer(panoramas: Panorama[]) {
  const viewerRef = useRef<HTMLDivElement>(null)
  const viewerInstanceRef = useRef<Viewer | null>(null)

  // That's a major workaround. Remover as soon as possible (Do português: Aquela gambiarra das brabas)
  const [, forceReloadReact] = useState('')

  const viewer = viewerInstanceRef.current
  const markersPlugin = viewer?.getPlugin<MarkersPlugin>(MarkersPlugin)
  const virtualTourPlugin =
    viewer?.getPlugin<VirtualTourPlugin>(VirtualTourPlugin)

  useEffect(() => {
    if (!viewerRef.current || viewerInstanceRef.current) {
      return
    }

    const nodes = createNodes({ panoramas })

    const viewerInstance = new Viewer({
      container: viewerRef.current,
      navbar: false,
      plugins: [
        MarkersPlugin,
        [
          VirtualTourPlugin,
          {
            renderMode: '2d',
            nodes,
          },
        ],
      ],
    })
    viewerInstanceRef.current = viewerInstance
    forceReloadReact('forced')
  }, [viewerRef, viewerInstanceRef, panoramas])

  return { viewer, viewerRef, markersPlugin, virtualTourPlugin }
}

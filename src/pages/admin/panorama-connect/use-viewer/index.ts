import { Viewer } from '@photo-sphere-viewer/core'
import { useEffect, useRef, useState } from 'react'
import { MarkersPlugin } from '@photo-sphere-viewer/markers-plugin'

import '@photo-sphere-viewer/virtual-tour-plugin/index.css'
import '@photo-sphere-viewer/core/index.css'
import '@photo-sphere-viewer/markers-plugin/index.css'
import { Panorama } from '@/types/Panorama'

export function useViewer(data?: Panorama) {
  const viewerRef = useRef<HTMLDivElement>(null)
  const viewerInstanceRef = useRef<Viewer | null>(null)

  // That's a major workaround. Remover as soon as possible (Do português: Aquela gambiarra das brabas)
  const [, forceReloadReact] = useState('')

  const viewer = viewerInstanceRef.current
  const markersPlugin = viewer?.getPlugin<MarkersPlugin>(MarkersPlugin)

  useEffect(() => {
    if (!viewerRef.current || !data || viewerInstanceRef.current) {
      return
    }
    const viewerInstance = new Viewer({
      container: viewerRef.current,
      panorama: `${data.images[data.images.length - 1].link}?no-cache-please`,
      navbar: false,
      plugins: [MarkersPlugin],
    })
    viewerInstanceRef.current = viewerInstance
    forceReloadReact('forced')
  }, [viewerRef, data, viewerInstanceRef])

  return { viewer, viewerRef, markersPlugin }
}

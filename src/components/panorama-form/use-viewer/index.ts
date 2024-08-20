import { Viewer } from '@photo-sphere-viewer/core'
import { useEffect, useRef, useState } from 'react'
import { MarkersPlugin } from '@photo-sphere-viewer/markers-plugin'

import '@photo-sphere-viewer/virtual-tour-plugin/index.css'
import '@photo-sphere-viewer/core/index.css'
import '@photo-sphere-viewer/markers-plugin/index.css'

export function useViewer(panoramaUrl: string) {
  const viewerRef = useRef<HTMLDivElement>(null)
  const viewerInstanceRef = useRef<Viewer | null>(null)

  // That's a major workaround. Remover as soon as possible (Do português: Aquela gambiarra das brabas)
  const [, forceReloadReact] = useState('')

  const viewer = viewerInstanceRef.current
  const markersPlugin = viewer?.getPlugin<MarkersPlugin>(MarkersPlugin)

  useEffect(() => {
    if (!viewerRef.current || !panoramaUrl || viewerInstanceRef.current) {
      return
    }
    const viewerInstance = new Viewer({
      container: viewerRef.current,
      panorama: `${panoramaUrl}?no-cache-please`,
      navbar: false,
      plugins: [MarkersPlugin],
    })
    viewerInstanceRef.current = viewerInstance
    forceReloadReact('forced')
  }, [viewerRef, panoramaUrl, viewerInstanceRef])

  return { viewer, viewerRef, markersPlugin }
}

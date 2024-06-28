import { Viewer } from '@photo-sphere-viewer/core'
import { createRef, useEffect, useRef, useState } from 'react'
import { MarkersPlugin } from '@photo-sphere-viewer/markers-plugin'
import { VirtualTourPlugin } from '@photo-sphere-viewer/virtual-tour-plugin'
import { Marking } from '@/types/Marking'
import MarkersTooltip from './markers-tooltip'

import '@photo-sphere-viewer/markers-plugin/index.css'
import '@photo-sphere-viewer/core/index.css'
import '@photo-sphere-viewer/virtual-tour-plugin/index.css'
import { useQuery } from '@tanstack/react-query'
import { getPanoramas } from '@/api/get-panoramas'
import { useLocation, useParams } from 'react-router-dom'
import { createNodes } from './create-nodes'
import { createMarkers } from './create-markers'
import { getEquipments } from '@/api/get-equipments'

export type MarkingWithRef = Marking & {
  ref: React.RefObject<HTMLDivElement>
}

export function PanoramaViewer() {
  const [markersPlugin, setMarkersPlugin] = useState<MarkersPlugin | null>(null)
  const [markingsComponent, setMarkingsComponent] = useState<MarkingWithRef[]>(
    [] as MarkingWithRef[],
  )
  const [hasExecutedGoto, setHasExecutedGoto] = useState(false)

  const { id: panoramaId } = useParams()
  const query = new URLSearchParams(useLocation().search)
  const equipmentFocusId = query.get('equipmentId')

  const { data: panoramas } = useQuery({
    queryKey: ['panorama'],
    queryFn: getPanoramas,
  })

  const { data: equipments } = useQuery({
    queryKey: ['equipments'],
    queryFn: getEquipments,
  })

  const sphereElementRef = useRef<HTMLDivElement>(null)

  function createMarkingsComponent(nodeId: string) {
    if (!panoramas) {
      return
    }

    const panorama = panoramas.find((panorama) => panorama.id === nodeId)
    const newMarkings = panorama?.markings?.map((marking) => ({
      ...marking,
      ref: createRef<HTMLDivElement>(),
    }))

    newMarkings && setMarkingsComponent(newMarkings)
  }

  useEffect(() => {
    if (!sphereElementRef.current || !panoramas) {
      return
    }

    const spherePlayerInstance = new Viewer({
      container: sphereElementRef.current,
      defaultYaw: '130deg',
      loadingTxt: 'Carregando...',
      plugins: [
        MarkersPlugin,
        [
          VirtualTourPlugin,
          {
            renderMode: 'markers',
            // startNodeId: panoramaId,
          },
        ],
      ],
    })

    // Nodes creating
    const nodes = createNodes(panoramas)
    const virtualTourPlugin =
      spherePlayerInstance.getPlugin<VirtualTourPlugin>(VirtualTourPlugin)
    virtualTourPlugin.setNodes(nodes, panoramaId)

    virtualTourPlugin.addEventListener('node-changed', ({ node }) =>
      createMarkingsComponent(node.id),
    )

    // Markers creating
    const markersPluginInstance =
      spherePlayerInstance.getPlugin<MarkersPlugin>(MarkersPlugin)
    setMarkersPlugin(markersPluginInstance)

    return () => {
      spherePlayerInstance.destroy()
    }
  }, [panoramaId, panoramas])

  useEffect(() => {
    if (!markersPlugin || markingsComponent.length === 0) {
      return
    }

    const markers = createMarkers(markingsComponent)

    markers.forEach((marker) => {
      markersPlugin.addMarker(marker)
    })

    if (equipmentFocusId && !hasExecutedGoto) {
      markersPlugin.gotoMarker(equipmentFocusId, '10rpm')
      setHasExecutedGoto(true)
    }
  }, [markingsComponent, markersPlugin, equipmentFocusId])

  return (
    <>
      <div className="h-[calc(100vh-3.5rem)]" ref={sphereElementRef} />
      {markingsComponent.map((marking) => {
        const equipment = equipments?.find(
          (equipment) => equipment.id === marking.equipment_id,
        )

        return (
          <div key={marking.equipment_id} className="sr-only">
            {equipment && (
              <MarkersTooltip equipment={equipment} ref={marking.ref} />
            )}
          </div>
        )
      })}
    </>
  )
}

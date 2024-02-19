import { Panorama } from '@/types/Panorama'
import { Viewer } from '@photo-sphere-viewer/core'
import { createRef, useEffect, useState } from 'react'
import { MarkersPlugin } from '@photo-sphere-viewer/markers-plugin'
import { Marking } from '@/types/Marking'
import { PanoramaViewerProvider } from '@/context/panorama-viewer-provider'
import MarkersTooltip from './markers-tooltip'

import '@photo-sphere-viewer/markers-plugin/index.css'
import '@photo-sphere-viewer/core/index.css'

export type MarkingWithRef = Marking & {
  ref: React.RefObject<HTMLDivElement>
}

interface photoSphereProps {
  panorama: Panorama
  imageLink: string
}

export function PhotoSphere({ panorama, imageLink }: photoSphereProps) {
  const [markingsComponent, setMarkingsComponent] = useState<MarkingWithRef[]>(
    [] as MarkingWithRef[],
  )

  const sphereElementRef = createRef<HTMLDivElement>()

  useEffect(() => {
    if (!sphereElementRef.current) {
      return
    }

    const markers = markingsComponent?.map(
      ({ coord_x, coord_y, equipment, ref }) => ({
        id: equipment.id,
        position: {
          textureX: coord_x,
          textureY: coord_y - 16,
        },
        content: ref.current?.outerHTML,
        size: { width: 32, height: 32 },
        // tooltip: {
        //   content: ref.current?.outerHTML,
        //   className: 'shadow-none bg-transparent min-w-min p-0 font-sans',
        //   trigger: 'click',
        // },
        image: '/pin-red.svg',
        listContent: equipment.name,
        // element: ref.current,
        // zIndex: 31,
      }),
    )

    const spherePlayerInstance = new Viewer({
      container: sphereElementRef.current,
      panorama: imageLink,
      plugins: [
        [
          MarkersPlugin,
          {
            markers,
          },
        ],
      ],
    })

    return () => {
      spherePlayerInstance.destroy()
    }
  }, [sphereElementRef, panorama, markingsComponent, imageLink])

  useEffect(() => {
    if (panorama.markings) {
      const newMarkings = panorama.markings.map((marking) => ({
        ...marking,
        ref: createRef<HTMLDivElement>(),
      }))
      setMarkingsComponent(newMarkings)
    }
  }, [panorama])

  return (
    <>
      <div className="h-screen " ref={sphereElementRef} />
      <PanoramaViewerProvider>
        {markingsComponent.map((marking) => (
          <div key={marking.equipment.id} className="sr-only">
            {/* <Markers equipment={marking.equipment} ref={marking.ref} /> */}
            <MarkersTooltip equipment={marking.equipment} ref={marking.ref} />
          </div>
        ))}
      </PanoramaViewerProvider>
    </>
  )
}

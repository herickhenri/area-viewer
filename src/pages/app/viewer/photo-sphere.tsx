import { Panorama } from '@/types/Panorama'
import { Viewer } from '@photo-sphere-viewer/core'
import { createRef, useEffect, useState } from 'react'
import { MarkersPlugin } from '@photo-sphere-viewer/markers-plugin'
import { Marking } from '@/types/Marking'
import Markers from './markers'

export type MarkingWithRef = Marking & {
  ref: React.RefObject<HTMLDivElement>
}

interface photoSphereProps {
  panorama: Panorama
}

export function PhotoSphere({ panorama }: photoSphereProps) {
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
        // content: ref.current?.outerHTML,
        size: { width: 32, height: 32 },
        tooltip: {
          content: ref.current?.outerHTML,
          className: 'shadow-none bg-transparent min-w-min p-0 font-sans',
          trigger: 'click',
        },
        image: '/pin-red.svg',
        listContent: equipment.name,
        // element: ref.current,
        // zIndex: 10,
      }),
    )

    const spherePlayerInstance = new Viewer({
      container: sphereElementRef.current,
      panorama: `https://corsproxy.io/?${panorama.image_link}`,
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
  }, [sphereElementRef, panorama, markingsComponent])

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
      <div className="h-screen" ref={sphereElementRef} />
      {markingsComponent.map((marking) => (
        <div key={marking.equipment.id} className="sr-only">
          <Markers equipment={marking.equipment} ref={marking.ref} />
        </div>
      ))}
    </>
  )
}

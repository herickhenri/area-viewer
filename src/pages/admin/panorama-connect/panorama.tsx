import { Panorama } from '@/types/Panorama'
import { Viewer } from '@photo-sphere-viewer/core'
import { createRef, useEffect } from 'react'

interface photoSphereProps {
  panorama: Panorama
}

export function PhotoSphere({ panorama }: photoSphereProps) {
  const sphereElementRef = createRef<HTMLDivElement>()

  useEffect(() => {
    if (!sphereElementRef.current) {
      return
    }

    const spherePlayerInstance = new Viewer({
      container: sphereElementRef.current,
      panorama: panorama.image_link,
    })

    return () => spherePlayerInstance.destroy()
  }, [sphereElementRef, panorama])

  return <div ref={sphereElementRef} />
}

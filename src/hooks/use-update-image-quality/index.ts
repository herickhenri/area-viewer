import { Panorama } from '@/types/Panorama'
import { Cache, Viewer } from '@photo-sphere-viewer/core'
import {
  VirtualTourNode,
  VirtualTourPlugin,
} from '@photo-sphere-viewer/virtual-tour-plugin'
import { useCallback, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

interface UpdateImageQualityProps {
  viewer: Viewer | null
  panoramas?: Panorama[]
  virtualTour?: VirtualTourPlugin
}

export function useUpdateImageQuality({
  viewer,
  panoramas,
  virtualTour,
}: UpdateImageQualityProps) {
  const [searchParams, setSearchParams] = useSearchParams()

  const updateQuality = useCallback(
    (nodeId: string) => {
      if (!viewer) return

      const cacheKeys = Object.keys(Cache.items)

      const imagesList = panoramas?.find(
        (panorama) => panorama.id === nodeId,
      )?.images

      const imagesNoCached = imagesList?.filter(
        (image) => !cacheKeys.includes(image.link),
      )

      if (imagesNoCached?.length) {
        viewer
          .setPanorama(imagesNoCached[0].link, {
            showLoader: false,
          })
          .then((isPanoramaLoaded) => {
            if (isPanoramaLoaded) {
              updateQuality(nodeId)
            }
          })
      } else {
        imagesList &&
          viewer.setPanorama(imagesList[imagesList.length - 1].link, {
            showLoader: false,
          })
      }
    },
    [panoramas, viewer],
  )

  useEffect(() => {
    if (!virtualTour) return

    function setNodeIdInParams(node: VirtualTourNode) {
      setSearchParams((state) => {
        state.set('nodeId', node.id)
        return state
      })
    }

    const handleNodeChanged = (event: { node: VirtualTourNode }) => {
      setNodeIdInParams(event.node)
      updateQuality(event.node.id)
    }

    virtualTour.addEventListener('node-changed', handleNodeChanged)

    return () => {
      virtualTour.removeEventListener('node-changed', handleNodeChanged)
    }
  }, [virtualTour, searchParams, setSearchParams, updateQuality])
}

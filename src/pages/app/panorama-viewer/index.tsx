import ReactDOMServer from 'react-dom/server'
import { getPanorama } from '@/api/get-panorama'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import {
  MarkersPlugin,
  ReactPhotoSphereViewer,
} from 'react-photo-sphere-viewer'
import { useEffect, useState } from 'react'
import { EquipmentCard } from './equipment-card'

import Pin from '@/assets/pin-red.svg'

type ImageSize = {
  width: number
  height: number
}

export function PanoramaViewer() {
  const { id } = useParams()
  const [imageSize, setImageSize] = useState<ImageSize | null>(null)

  const {
    data: panorama,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['panorama', id],
    queryFn: () => getPanorama(id!),
  })

  useEffect(() => {
    if (!panorama) {
      return
    }
    const fetchData = async () => {
      const image = new Image()

      const loadImage = new Promise<void>((resolve) => {
        image.onload = () => {
          const width = image.width
          const height = image.height

          setImageSize({ width, height })
          resolve()
        }
      })

      image.src = panorama.image_link
      await loadImage
    }

    fetchData()
  }, [panorama])

  if (isLoading) {
    return <p>Carregando...</p>
  }

  if (isError || !panorama || !imageSize) {
    return <p>Ocorreu um erro ao carregar o panorama.</p>
  }

  const fullWidth = imageSize.width
  const fullHeight = imageSize.width / 2
  const croppedWidth = imageSize.width
  const croppedHeight = imageSize.height
  const croppedX = 0
  const croppedY = fullHeight / 2 - imageSize.height / 2

  const markers = panorama.markings?.map(({ coord_x, coord_y, equipment }) => {
    const id = equipment.id
    const position = {
      textureX: coord_x,
      textureY: coord_y,
    }
    const size = { width: 32, height: 32 }

    const tooltip = {
      content: ReactDOMServer.renderToString(
        <EquipmentCard equipment={equipment} />,
      ),
      className: 'shadow-none bg-transparent w-auto',
      trigger: 'click',
    }
    const image = 'image'
    const className = 'bg-pin-red'

    return {
      id,
      position,
      size,
      tooltip,
      image,
      className,
    }
  })

  const plugins = [
    [
      MarkersPlugin,
      {
        markers,
      },
    ],
  ]

  return (
    <ReactPhotoSphereViewer
      src={`https://corsproxy.io/?${panorama.image_link}`}
      height={'100vh'}
      width={'100%'}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      plugins={plugins}
      panoData={{
        isEquirectangular: true,
        fullWidth,
        fullHeight,
        croppedWidth,
        croppedHeight,
        croppedX,
        croppedY,
      }}
    ></ReactPhotoSphereViewer>
  )
}

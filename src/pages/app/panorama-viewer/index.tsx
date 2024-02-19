import { useQuery } from '@tanstack/react-query'
import { PhotoSphere } from './photo-sphere'
import { getPanorama } from '@/api/get-panorama'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

export function PanoramaViewer() {
  const { id } = useParams()

  const { data: panorama } = useQuery({
    queryKey: ['panorama', id],
    queryFn: () => getPanorama(id!),
  })

  // useEffect(() => {
  //   if (!panorama) {
  //     return
  //   }

  //   const panoramaImage = new Image()
  //   panoramaImage.crossOrigin = 'anonymous'

  //   panoramaImage.onload = () => {
  //     console.log(panoramaImage)
  //     setPanoramaElement(panoramaImage)
  //   }

  //   panoramaImage.src = panorama.image_link
  // }, [panorama])

  const [url, setUrl] = useState('')

  useEffect(() => {
    if (!panorama) {
      return
    }

    // Requisição para a imagem
    fetch(panorama.image_link, {
      method: 'GET',
      headers: {
        Origin: 'http://localhost:5173', // Adicione a origem permitida
      },
    })
      .then((response) => {
        return response.blob()
      })
      .then((blob) => {
        // Criar uma URL para a imagem
        const imageUrl = URL.createObjectURL(blob)
        setUrl(imageUrl)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [panorama])

  if (!panorama || !url) {
    return <h1>Loading...</h1>
  }

  return <PhotoSphere panorama={panorama} imageLink={url} />
}

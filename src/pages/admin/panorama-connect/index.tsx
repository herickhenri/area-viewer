import { useQuery } from '@tanstack/react-query'
import { PhotoSphere } from './panorama'
import { useParams } from 'react-router-dom'
import { getPanorama } from '@/api/get-panorama'

export function PanoramaConnect() {
  const { id } = useParams()

  const { data: panorama } = useQuery({
    queryKey: ['panorama', id],
    queryFn: () => getPanorama(id!),
  })

  if (!panorama) {
    return <h1>carregando...</h1>
  }

  return <PhotoSphere panorama={panorama} />
}

import { useQuery } from '@tanstack/react-query'
import { PhotoSphere } from './photo-sphere'
import { getPanorama } from '@/api/get-panorama'
import { useParams } from 'react-router-dom'

export function Viewer() {
  const { id } = useParams()

  const { data: panorama } = useQuery({
    queryKey: ['panorama', id],
    queryFn: () => getPanorama(id!),
  })

  if (!panorama) {
    return <h1>Loading...</h1>
  }

  return <PhotoSphere panorama={panorama} />
}

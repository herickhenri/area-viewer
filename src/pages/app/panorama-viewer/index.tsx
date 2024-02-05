import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { getPanorama } from '@/api/get-panorama'
import { CanvasArea } from './canvas-area'
import { Suspense } from 'react'

export function PanoramaViewer() {
  const { id } = useParams()

  const {
    data: panorama,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['panorama', id],
    queryFn: () => getPanorama(id!),
  })

  if (isLoading) {
    return <p>Carregando...</p>
  }

  if (isError || !panorama) {
    return <p>Ocorreu um erro ao carregar o panorama.</p>
  }

  return (
    <Suspense fallback={null}>
      <div className="h-screen w-full">
        <CanvasArea panorama={panorama} />
      </div>
    </Suspense>
  )
}

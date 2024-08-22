import { useQuery } from '@tanstack/react-query'
import { getPanoramas } from '@/api/get-panoramas'
import { useViewer } from '@/pages/app/panorama-viewer/hooks/use-viewer'
import { useUpdateImageQuality } from '@/pages/app/panorama-viewer/hooks/use-update-image-quality'
import { getEquipments } from '@/api/get-equipments'
import { getNotes } from '@/api/get-notes'
import { MarkersInfo } from './markers-info'

export function PanoramaViewer() {
  const { data: panoramas } = useQuery({
    queryKey: ['panoramas'],
    queryFn: getPanoramas,
    staleTime: Infinity,
  })
  const { data: equipments } = useQuery({
    queryKey: ['equipments'],
    queryFn: getEquipments,
  })
  const { data: notes } = useQuery({
    queryKey: ['notes'],
    queryFn: getNotes,
  })

  const { viewerRef, virtualTour, markersPlugin, viewer } = useViewer({
    panoramas,
    equipments,
    notes,
  })

  useUpdateImageQuality({ panoramas, viewer, virtualTour })

  return (
    <div>
      {markersPlugin && (
        <MarkersInfo
          equipments={equipments}
          panoramas={panoramas}
          notes={notes}
          markersPlugin={markersPlugin}
        />
      )}
      <div className="h-screen w-full" ref={viewerRef}></div>
    </div>
  )
}

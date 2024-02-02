import { api } from '@/lib/axios'
import { Panorama } from '@/types/Panorama'

interface responseShema {
  panorama: Panorama
}

interface bodySchema {
  id: string
  name?: string
  image_key?: string
  image_link?: string
  markings?: {
    equipment_id: string
    coord_x: number
    coord_y: number
  }[]
}

export async function updatePanorama({
  id,
  name,
  image_key,
  image_link,
  markings,
}: bodySchema) {
  const response = await api.patch<responseShema>(`/panorama/${id}`, {
    name,
    image_key,
    image_link,
    markings,
  })

  return response.data.panorama
}

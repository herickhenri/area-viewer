import { api } from '@/lib/axios'
import { Panorama } from '@/types/Panorama'

interface bodySchema {
  name: string
  image_key: string
  image_link: string
  markings?: {
    coord_x: number
    coord_y: number
    equipment_id: string
  }[]
  gps_x?: number
  gps_y?: number
}

interface responseSchema {
  panorama: Panorama
}

export async function createPanorama(data: bodySchema) {
  const response = await api.post<responseSchema>('/panorama', data)

  return response.data.panorama
}

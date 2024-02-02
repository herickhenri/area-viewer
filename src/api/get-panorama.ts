import { api } from '@/lib/axios'
import { Panorama } from '@/types/Panorama'

interface responseShema {
  panorama: Panorama
}

export async function getPanorama(id: string) {
  const response = await api.get<responseShema>(`/panorama/${id}`)

  return response.data.panorama
}

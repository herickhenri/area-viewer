import { api } from '@/lib/axios'
import { Panorama } from '@/types/Panorama'

interface responseShema {
  panoramas: Panorama[]
}

export async function getPanoramas() {
  const response = await api.get<responseShema>('/panoramas')

  return response.data.panoramas
}

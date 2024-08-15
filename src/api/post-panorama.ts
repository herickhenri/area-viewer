import { api } from '@/lib/axios'
import { Panorama } from '@/types/Panorama'

interface responseSchema {
  panorama: Panorama
}

export async function createPanorama(formData: FormData) {
  const response = await api.post<responseSchema>('/panorama', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return response.data.panorama
}

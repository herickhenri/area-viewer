import { api } from '@/lib/axios'
import { Panorama } from '@/types/Panorama'

interface responseShema {
  panorama: Panorama
}

interface bodySchema {
  id: string
  formData: FormData
}

export async function updatePanorama({ id, formData }: bodySchema) {
  const response = await api.patch<responseShema>(`/panorama/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return response.data.panorama
}

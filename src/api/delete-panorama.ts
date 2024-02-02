import { api } from '@/lib/axios'

export async function deletePanorama(id: string) {
  const response = await api.delete<void>(`/panorama/${id}`)

  return response
}

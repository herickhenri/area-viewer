import { api } from '@/lib/axios'

interface bodySchema {
  panorama_id: string
  panorama_connect_id: string
}

export async function deleteConnection(data: bodySchema) {
  const response = await api.delete<void>(`/connection`, { data })

  return response
}

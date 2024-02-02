import { api } from '@/lib/axios'

export async function deleteEquipment(id: string) {
  const response = await api.delete<void>(`/equipment/${id}`)

  return response
}

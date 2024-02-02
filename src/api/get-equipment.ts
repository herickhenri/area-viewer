import { api } from '@/lib/axios'
import { Equipment } from '@/types/Equipment'

interface responseShema {
  equipment: Equipment
}

export async function getEquipment(id: string) {
  const response = await api.get<responseShema>(`/equipment/${id}`)

  return response.data.equipment
}

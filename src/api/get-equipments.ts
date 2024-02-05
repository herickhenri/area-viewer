import { api } from '@/lib/axios'
import { Equipment } from '@/types/Equipment'

interface responseShema {
  equipments: Equipment[]
}

export async function getEquipments() {
  const response = await api.get<responseShema>('/all-equipments')

  return response.data.equipments
}

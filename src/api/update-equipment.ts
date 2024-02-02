import { api } from '@/lib/axios'
import { Equipment } from '@/types/Equipment'

interface responseShema {
  equipment: Equipment
}

interface bodySchema {
  id: string
  name?: string
  tag?: string
  description?: string
  photos?: {
    key: string
    link: string
  }[]
}

export async function updateEquipment({
  id,
  name,
  tag,
  description,
  photos,
}: bodySchema) {
  const response = await api.patch<responseShema>(`/equipment/${id}`, {
    name,
    tag,
    description,
    photos,
  })

  return response.data.equipment
}

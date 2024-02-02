import { api } from '@/lib/axios'
import { Equipment } from '@/types/Equipment'

interface responseShema {
  equipment: Equipment
}

interface bodySchema {
  name: string
  tag: string
  description?: string
  photos?: {
    key: string
    link: string
  }[]
}

export async function postEquipment({
  name,
  tag,
  description,
  photos,
}: bodySchema) {
  const response = await api.post<responseShema>('/equipment', {
    name,
    tag,
    description,
    photos,
  })

  return response.data.equipment
}

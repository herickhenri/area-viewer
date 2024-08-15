import { api } from '@/lib/axios'
import { Equipment } from '@/types/Equipment'

interface responseShema {
  equipment: Equipment
}

export async function postEquipment(formData: FormData) {
  const response = await api.post<responseShema>('/equipment', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return response.data.equipment
}

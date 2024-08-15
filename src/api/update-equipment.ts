import { api } from '@/lib/axios'
import { Equipment } from '@/types/Equipment'

interface ResponseShema {
  equipment: Equipment
}

interface BodySchema {
  id: string
  formData: FormData
}

export async function updateEquipment({ id, formData }: BodySchema) {
  const response = await api.patch<ResponseShema>(
    `/equipment/${id}`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  )

  return response.data.equipment
}

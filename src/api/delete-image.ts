import { api } from '@/lib/axios'

export async function deleteImage(key: string) {
  await api.delete<void>(`/image/${key}`)
}

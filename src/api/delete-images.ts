import { api } from '@/lib/axios'

export async function deleteImages(keys: string[]) {
  await api.delete<void>('/all-images', { data: { keys } })
}

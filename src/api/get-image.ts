import { api } from '@/lib/axios'

type File = {
  buffer: Buffer
  name: string
  contentType: string
}

export async function getImage(key: string) {
  const file = await api.get<File>(`/image/${key}`)

  return file.data
}

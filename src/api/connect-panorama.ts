import { api } from '@/lib/axios'

type Link = {
  panorama_id: string
  panorama_connect_id: string
  coord_x: number
  coord_y: number
}

interface bodySchema {
  connection: [Link, Link]
}

export async function connectPanoramas(data: bodySchema) {
  await api.post('/connection', data)
}

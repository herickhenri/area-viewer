import { api } from '@/lib/axios'

type Connection = {
  yaw: number
  pitch: number
  connected_from_id: string
  connected_to_id: string
}

interface bodySchema {
  connections: [Connection, Connection]
}

export async function connectPanoramas(data: bodySchema) {
  await api.post('/connection', data)
}

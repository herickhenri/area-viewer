export type Connection = {
  yaw: number
  pitch: number
  connected_from_id: string
  connected_to_id: string
}

export type Panorama = {
  id: string
  name: string
  images: {
    key: string
    link: string
    quality: number
  }[]
  equipments?: {
    yaw: number
    pitch: number
    equipment_id: string
  }[]
  notes?: {
    yaw: number
    pitch: number
    note_id: string
  }[]
  connections_from?: Connection[]
  connections_to?: Connection[]
}

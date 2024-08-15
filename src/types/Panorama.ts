export type Panorama = {
  id: string
  name: string
  images: {
    key: string
    link: string
    quality: number
  }[]
  equipments?: {
    coord_x: number
    coord_y: number
    equipment_id: string
  }[]
  links?: {
    coord_x: number
    coord_y: number
    panorama_connect_id: string
  }[]
  notes?: {
    coord_x: number
    coord_y: number
    note_id: string
  }[]
}

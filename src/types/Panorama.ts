import { Marking } from './Marking'

export type Panorama = {
  id: string
  name: string
  image_key: string
  image_link: string
  markings?: Marking[]
  gps_x?: number
  gps_y?: number
  links: {
    coord_x: number
    coord_y: number
    panorama_connect_id: string
  }[]
}

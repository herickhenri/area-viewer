import { Marking } from './Marking'

export type Panorama = {
  id: string
  name: string
  image_key: string
  image_link: string
  markings?: Marking[]
  gps_x?: number
  gps_y?: number
}

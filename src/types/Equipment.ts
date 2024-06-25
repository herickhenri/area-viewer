import { Note } from './Note'
import { Panorama } from './Panorama'

export type Equipment = {
  id: string
  name: string
  tag: string
  description?: string
  photos?: {
    key: string
    link: string
  }[]
  markings?: {
    panorama: Panorama
  }[]
  notes?: Note[]
}

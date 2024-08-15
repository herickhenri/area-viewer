import { Note } from './Note'

export type Equipment = {
  id: string
  name: string
  tag: string
  description?: string
  photos?: {
    key: string
    link: string
  }[]
  panoramas?: {
    panorama_id: string
  }[]
  notes?: Note[]
}

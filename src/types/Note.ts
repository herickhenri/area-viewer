export const opportunityDict = {
  0: 'Em operação',
  1: 'Semanal fora de operação',
  2: 'Parada programa',
  3: 'Parada geral',
}

export type Note = {
  createdAt: Date
  id: string
  description: string
  equipment_tag: string
  author: string
  opportunity: 0 | 1 | 2 | 3
  equipmentId?: string
  NotesOnPanoramas?: {
    panorama_id: string
    coord_x: number
    coord_y: number
  }[]
}

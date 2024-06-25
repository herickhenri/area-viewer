import { api } from '@/lib/axios'
import { Note } from '@/types/Note'

interface ResponseSchema {
  notes: Note[]
}

export async function getNotes() {
  const response = await api.get<ResponseSchema>('/notes')

  return response.data.notes
}

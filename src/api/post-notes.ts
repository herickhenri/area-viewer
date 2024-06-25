import { api } from '@/lib/axios'
import { Note } from '@/types/Note'

export async function postNotes(notes: Note[]) {
  const response = await api.post<void>('/notes', notes)

  return response.data
}

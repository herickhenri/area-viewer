import { api } from '@/lib/axios'
import { Note } from '@/types/Note'

interface responseShema {
  note: Note
}

export async function getNote(id: string) {
  const response = await api.get<responseShema>(`/note/${id}`)

  return response.data.note
}

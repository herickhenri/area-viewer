import { api } from '@/lib/axios'

interface NoteMarkupSchema {
  panorama_id: string
  note_id: string
  yaw: number
  pitch: number
}

export async function postNoteMarkup(connection: NoteMarkupSchema) {
  const response = await api.post<void>('/note/markup', connection)

  return response.data
}

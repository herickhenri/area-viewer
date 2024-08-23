import { getNotes } from '@/api/get-notes'
import { Button } from '@/components/button'
import { Title } from '@/components/title'
import { Note } from '@/types/Note'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export function MarkNote() {
  const [noteId, setNoteId] = useState('')
  const [noteFind, setNoteFind] = useState<null | Note>(null)

  const { data: notes } = useQuery({
    queryKey: ['notes', noteId],
    queryFn: getNotes,
  })

  function findNote() {
    const note = notes?.find(({ id }) => id === noteId)

    note && setNoteFind(note)

    console.log(noteFind)
  }

  return (
    <div>
      <Title>Marcar nota</Title>

      <input
        type="text"
        placeholder="Digite o numero da nota"
        onChange={(e) => setNoteId(e.target.value)}
        value={noteId}
      />

      <Button onClick={findNote}>Buscar nota</Button>
    </div>
  )
}

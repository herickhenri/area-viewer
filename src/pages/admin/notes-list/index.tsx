import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { Title } from '@/components/title'
import { getNotes } from '@/api/get-notes'
import { NoteCard } from './note-card'
import { SearchInput } from '@/components/search-input'
import { searchNotesFilter } from '@/utils/search-notes-filter'

export function NotesList() {
  const [search, setSeach] = useState('')

  const { data: notes } = useQuery({
    queryKey: ['notes'],
    queryFn: getNotes,
  })

  if (!notes) {
    return <span>Carregando...</span>
  }

  const filteredNotes = searchNotesFilter({ notes, search })

  const notesList = search.length > 0 ? filteredNotes : notes

  return (
    <div className="px-20">
      <SearchInput search={search} changeSearch={setSeach} />
      <Title>Lista de notas</Title>
      <div className="grid grid-cols-3 gap-4">
        {notesList.map((note) => (
          <NoteCard note={note} key={note.id} />
        ))}
      </div>
    </div>
  )
}

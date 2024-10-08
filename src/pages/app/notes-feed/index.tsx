import { getNotes } from '@/api/get-notes'
import { Title } from '@/components/title'
import { searchNotesFilter } from '@/utils/search-notes-filter'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { NoteCard } from './note-card'
import { getEquipments } from '@/api/get-equipments'
import { SearchInput } from '@/components/search-input'

export function NotesFeed() {
  const [search, setSeach] = useState('')

  const { data: notes } = useQuery({
    queryKey: ['notes'],
    queryFn: getNotes,
  })
  const { data: equipments } = useQuery({
    queryKey: ['equipments'],
    queryFn: getEquipments,
  })

  if (!notes || !equipments) {
    return <h1>Carregando...</h1>
  }

  const filteredNotes = searchNotesFilter({ notes, search })

  const notesList = search.length > 0 ? filteredNotes : notes

  return (
    <div className="pb-10">
      <SearchInput search={search} changeSearch={setSeach} />
      <Title>Notas em aberto</Title>
      <div className="mx-6 grid grid-cols-1 gap-4 md:mx-20 md:grid-cols-3">
        {notesList.map((note) => {
          const equipment = equipments.find(
            (equipment) => equipment.id === note.equipment_id,
          )

          return <NoteCard key={note.id} note={note} equipment={equipment} />
        })}
      </div>
    </div>
  )
}

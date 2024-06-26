import { getNotes } from '@/api/get-notes'
import { SearchInput } from '@/components/search-input'
import { Title } from '@/components/title'
import { searchNotesFilter } from '@/utils/search-notes-filter'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { NoteCard } from './note-card'
import { getEquipments } from '@/api/get-equipments'

export function NotesList() {
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
    <div className="flex-1 pb-10">
      <SearchInput search={search} changeSearch={setSeach} className=" " />
      <Title>Notas em aberto</Title>
      <div className="mx-6 grid grid-cols-1 gap-4 md:mx-20 md:grid-cols-3">
        {notesList.map((note) => {
          const equipment = equipments.find(
            (equipment) => equipment.id === note.equipmentId,
          )

          return <NoteCard key={note.id} note={note} equipment={equipment} />
        })}
      </div>
    </div>
  )
}

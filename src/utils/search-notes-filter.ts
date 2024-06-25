import { Note, opportunityDict } from '@/types/Note'

interface SearchNotesFilterProps {
  notes: Note[]
  search: string
}

export function searchNotesFilter({ notes, search }: SearchNotesFilterProps) {
  const cleanSearch = search.trim().toUpperCase()

  const filteredNotes = notes.filter((note) => {
    const isAuthor = note.author.toUpperCase().includes(cleanSearch)
    const isDescription = note.description.toUpperCase().includes(cleanSearch)
    const isId = note.id.includes(cleanSearch)
    const isOpportunity = opportunityDict[note.opportunity]
      .toUpperCase()
      .includes(cleanSearch)
    const isTag = note.equipment_tag.toUpperCase().includes(cleanSearch)

    if (isAuthor || isDescription || isId || isOpportunity || isTag) {
      return true
    }

    return false
  })

  return filteredNotes
}

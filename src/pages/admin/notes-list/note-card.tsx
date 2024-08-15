import { Button } from '@/components/button'
import { Note, opportunityDict } from '@/types/Note'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'

interface NoteCardProps {
  note: Note
}

export function NoteCard({ note }: NoteCardProps) {
  return (
    <div
      key={note.id}
      className="flex flex-col rounded-lg bg-white p-6 text-sm text-gray-600 shadow-lg"
    >
      <div>
        <span className="font-semibold">Autor: </span>
        <span className="capitalize">{note.author.toLowerCase()}</span>
      </div>
      <div>
        <span className="font-semibold">Descrição: </span>
        <span className="captalize">{note.description.toLowerCase()}</span>
      </div>
      <div>
        <span className="font-semibold">Local de instalação: </span>
        <span>{note.equipment_tag}</span>
      </div>
      <div>
        <span className="font-semibold">Oportunidade: </span>
        <span>{opportunityDict[note.opportunity]}</span>
      </div>
      <div>
        <span className="font-semibold">Data de criação: </span>
        <span>{dayjs(note.created_at).format('DD/MM/YYYY')}</span>
      </div>
      <div>
        <span className="font-semibold">Nota: </span>
        <span>{note.id}</span>
      </div>
      <Link
        to={`/admin/notes/mark/${note.id}`}
        className="mt-2 grid flex-1 items-end"
      >
        <Button className="text-sm">Marcar na área</Button>
      </Link>
    </div>
  )
}

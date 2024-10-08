import { Button } from '@/components/button'
import { Equipment } from '@/types/Equipment'
import { Note, opportunityDict } from '@/types/Note'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'

interface NoteCardProps {
  note: Note
  equipment?: Equipment
}

export function NoteCard({ note, equipment }: NoteCardProps) {
  return (
    <div
      key={note.id}
      className="flex-1 rounded-lg bg-white p-6 text-sm text-gray-600 shadow-lg"
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
      {equipment?.panoramas && (
        <Link to={`/panorama/viewer/${equipment.panoramas[0].panorama_id}`}>
          <Button className="mt-2 text-sm">Ver na área</Button>
        </Link>
      )}
    </div>
  )
}

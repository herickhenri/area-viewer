import { Note, opportunityDict } from '@/types/Note'
import { CameraSlash } from '@phosphor-icons/react'
import dayjs from 'dayjs'

interface MarkerNoteProps {
  note: Note
}

export function MarkerNote({ note }: MarkerNoteProps) {
  return (
    <div>
      <div className="flex aspect-square items-center justify-center bg-slate-300 opacity-50">
        <CameraSlash size={32} />
      </div>
      <div className="flex-1 p-6 text-sm text-gray-600">
        <span className="text-xl font-semibold">Nota</span>
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
      </div>
    </div>
  )
}

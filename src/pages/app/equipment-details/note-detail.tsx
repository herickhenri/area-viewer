import { Note, opportunityDict } from '@/types/Note'
import { X } from '@phosphor-icons/react'
import * as Dialog from '@radix-ui/react-dialog'
import dayjs from 'dayjs'

interface NoteDetailProps {
  note: Note
}

export function NoteDetail({ note }: NoteDetailProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="cursor-pointer text-blue-600 underline transition-colors hover:text-blue-500">
        Ver detalhes
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/30" />
        <Dialog.Content className="absolute left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-slate-100 p-6 text-sm text-gray-600 shadow-lg">
          <Dialog.Close className="absolute right-4 top-4 cursor-pointer opacity-50 transition-all hover:opacity-100">
            <X size={20} />
          </Dialog.Close>
          <h2 className="mb-4 text-center text-lg font-semibold">Nota</h2>
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
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

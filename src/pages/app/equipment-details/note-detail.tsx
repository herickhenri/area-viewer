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
        <Dialog.Content className="absolute left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-slate-100 p-4">
          <Dialog.Close className="absolute right-4 top-4 cursor-pointer text-black/50 transition-all hover:text-black">
            <X size={20} />
          </Dialog.Close>
          <h2 className="mb-3 text-center text-lg font-medium">Nota</h2>
          <span className="block capitalize">
            Título: {note.description.toLowerCase()}
          </span>
          <span className="block">
            Data de criação: {dayjs(note.createdAt).format('DD/MM/YYYY')}
          </span>
          <span className="block capitalize">
            Autor: {note.author.toLowerCase()}
          </span>
          <span className="block">
            Oportunidade: {opportunityDict[note.opportunity]}
          </span>
          <span></span>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

import { useMutation, useQuery } from '@tanstack/react-query'
import { getPanoramas } from '@/api/get-panoramas'
import { Title } from '@/components/title'
import { useSearchParams } from 'react-router-dom'
import { SelectInput } from './select-input'
import { Button } from '@/components/button'
import { PanoramaArea } from './panorama-area'
import { NoteCard } from './note-card'
import { CircleNotch } from '@phosphor-icons/react'
import { postNoteMarkup } from '@/api/post-note-markup'
import { getNotes } from '@/api/get-notes'
import { z } from 'zod'
import Input from '@/components/input'
import { Label } from '@/components/label'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'
import { useState } from 'react'
import { Note } from '@/types/Note'
import { WarningNoteNotFound } from './warning-note-not-found'

const CreateNotesMarkerSchema = z.object({
  note_id: z.string().min(8, 'O numero da nota precisa conter 8 caracteres'),
  panorama_id: z.string(),
  position: z.object({
    yaw: z.number(),
    pitch: z.number(),
  }),
})

export type CreateNotesMarkerData = z.infer<typeof CreateNotesMarkerSchema>

export function NoteMark() {
  const [searchParams, setSearchParams] = useSearchParams()
  const noteId = searchParams.get('noteId')
  const [note, setNote] = useState<Note | null>(null)
  const [warningIsOpen, setWarningIsOpen] = useState(false)

  const { data: panoramas } = useQuery({
    queryKey: ['panoramas'],
    queryFn: getPanoramas,
  })
  const { data: notes } = useQuery({
    queryKey: ['notes'],
    queryFn: () => getNotes(),
  })
  const { mutateAsync: postNoteMarkupMutate } = useMutation({
    mutationKey: ['postNoteMarkup'],
    mutationFn: postNoteMarkup,
  })

  const newMarkForm = useForm<CreateNotesMarkerData>({
    resolver: zodResolver(CreateNotesMarkerSchema),
    defaultValues: {
      note_id: noteId || undefined,
    },
  })

  const { control, watch, register, getValues, handleSubmit } = newMarkForm

  if (!panoramas || !notes) {
    return (
      <div className="flex h-full w-full flex-1 items-center justify-center">
        <CircleNotch
          weight="bold"
          size={32}
          className="animate-spin text-blue-600"
        />
      </div>
    )
  }

  const panoramaId = watch('panorama_id')

  function handleFindNote() {
    const noteId = getValues('note_id')
    const noteFind = notes?.find(({ id }) => id === noteId)

    if (noteFind) {
      setNote(noteFind)
      setSearchParams((state) => {
        state.set('noteId', noteId)
        return state
      })
    } else {
      setNote(null)
      setSearchParams((state) => {
        state.delete('noteId')
        return state
      })
      setWarningIsOpen(true)
    }
  }

  async function handleCreateNoteMarker({
    note_id,
    panorama_id,
    position,
  }: CreateNotesMarkerData) {
    try {
      await postNoteMarkupMutate({
        note_id,
        panorama_id,
        pitch: position.pitch,
        yaw: position.yaw,
      })

      toast.success('Marcação criada com sucesso')
    } catch {
      toast.error('Erro ao criar a marcação!')
    }
  }

  return (
    <div className="mb-20 px-56">
      <Title>Marcar nota</Title>
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(handleCreateNoteMarker)}
      >
        <Label title="Número da nota">
          <div className="flex items-center gap-4">
            <Input className="mt-0 h-10" {...register('note_id')} />
            <Button
              type="button"
              className="h-10 text-sm"
              onClick={handleFindNote}
            >
              Buscar
            </Button>
          </div>
        </Label>

        {note && <NoteCard note={note} />}
        <span>Selecione o panorama correspondente a nota: </span>
        <Controller
          control={control}
          name="panorama_id"
          render={({ field }) => (
            <SelectInput
              panoramas={panoramas}
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
        {panoramaId && (
          <FormProvider {...newMarkForm}>
            <Controller
              control={control}
              name="position"
              render={({ field }) => (
                <PanoramaArea
                  value={field.value}
                  onChange={field.onChange}
                  panoramas={panoramas}
                  currentPanoramaId={panoramaId}
                />
              )}
            />
          </FormProvider>
        )}
        <Button className="mx-auto">Marcar nota</Button>
      </form>

      <WarningNoteNotFound open={warningIsOpen} changeOpen={setWarningIsOpen} />
    </div>
  )
}

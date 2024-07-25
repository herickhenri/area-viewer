import { useMutation, useQuery } from '@tanstack/react-query'
import { getPanoramas } from '@/api/get-panoramas'
import { useState } from 'react'
import { Title } from '@/components/title'
import { useParams } from 'react-router-dom'
import { getNote } from '@/api/get-note'
import { Item, SelectInput } from './select-input'
import { Button } from '@/components/button'
import { PanoramaArea } from './panorama-area'
import { NoteCard } from './note-card'
import { CircleNotch } from '@phosphor-icons/react'
import { postNoteMarkup } from '@/api/post-note-markup'
import { toast } from 'react-toastify'

export type Coord = {
  coord_x: number
  coord_y: number
}

type Connection = {
  note_id: string
  panorama_id: string
  coord_x: number
  coord_y: number
}

export function NoteMark() {
  const { id } = useParams()
  const [selectedItem, setSelectedItem] = useState<Item | null>(null)
  const [coord, setCoord] = useState<Coord | null>(null)

  const { data: panoramas } = useQuery({
    queryKey: ['panoramas'],
    queryFn: getPanoramas,
  })
  const { data: note } = useQuery({
    queryKey: ['note'],
    queryFn: () => getNote(id!),
  })
  const { mutateAsync: postNoteMarkupMutate } = useMutation({
    mutationKey: ['postNoteMarkup'],
    mutationFn: postNoteMarkup,
  })

  function changeItem(item: Item | null) {
    setSelectedItem(item)
  }

  function changeCoord(coordinates: Coord) {
    setCoord(coordinates)
  }

  async function markNote(connection: Connection) {
    try {
      await postNoteMarkupMutate(connection)
      toast.success('Marcação criada com sucesso.')
    } catch (err) {
      console.error(err)
      toast.error('Erro ao criar a marcação.')
    }
  }

  if (!panoramas || !note) {
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

  const items: Item[] = panoramas.map((panorama) => ({
    value: panorama.id,
    label: panorama.name,
  }))

  const selectedPanorama = panoramas.find(
    (panorama) => panorama.id === selectedItem?.value,
  )

  return (
    <div className="mb-20 px-56">
      <Title>Marcar nota</Title>
      <div className="flex flex-col gap-4">
        {note && (
          <div>
            <span>Nota: </span>
            <NoteCard note={note} />
          </div>
        )}
        <span>Selecione o panorama correspondente a nota: </span>
        <SelectInput options={items} onChange={changeItem} />
        {selectedPanorama && (
          <PanoramaArea
            source={selectedPanorama.image_link}
            coord={coord}
            changeCoord={changeCoord}
          />
        )}

        <Button
          disabled={!coord || !selectedItem}
          className="mx-auto"
          onClick={() =>
            coord &&
            selectedPanorama &&
            markNote({
              coord_x: coord.coord_x,
              coord_y: coord.coord_y,
              panorama_id: selectedPanorama?.id,
              note_id: note.id,
            })
          }
        >
          Marcar nota
        </Button>
      </div>
    </div>
  )
}

import * as XLSX from 'xlsx'
import { FileXls } from '@phosphor-icons/react'
import { UploadFile } from './upload-file'
import { useEffect, useState } from 'react'
import { Note } from '@/types/Note'
import dayjs from 'dayjs'
import { Button } from '@/components/button'
import { useMutation, useQuery } from '@tanstack/react-query'
import { postNotes } from '@/api/post-notes'
import { toast } from 'react-toastify'
import { getEquipments } from '@/api/get-equipments'

export function SubmitNotes() {
  const [file, setFile] = useState<File>()
  const [notes, setNotes] = useState<Note[]>()

  const { data: equipments } = useQuery({
    queryKey: ['equipments'],
    queryFn: getEquipments,
  })

  const { mutateAsync: postNotesMutate } = useMutation({
    mutationKey: ['notes'],
    mutationFn: postNotes,
  })

  function changeFile(newFile: File) {
    setFile(newFile)
  }

  useEffect(() => {
    if (!file) {
      return
    }

    function adjustForTimezone(dateString: string) {
      const date = new Date(dateString)
      date.setHours(date.getHours() + 3)
      return date
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      const data =
        e.target?.result && new Uint8Array(e.target.result as ArrayBuffer)
      const workbook = XLSX.read(data)

      const sheetName = workbook.SheetNames[0]
      const worksheet = workbook.Sheets[sheetName]

      const dataSheet = XLSX.utils.sheet_to_json(worksheet, { raw: true })

      const newNotes = dataSheet.map((row: any) => {
        const note: Note = {
          createdAt: adjustForTimezone(
            row['Dt.criação']
              .toString()
              .replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3'),
          ),
          author: row['Autor da nota'],
          description: row['Descrição'],
          equipment_tag: row['Loc.instalação'],
          id: row['Nota'],
          opportunity: Number(row['Oportunidade']) as 0 | 1 | 2 | 3,
        }

        return note
      })

      setNotes(newNotes)
    }
    reader.readAsArrayBuffer(file)
  }, [file])

  function formatTag(tag: string) {
    const cleanTag = tag.replace(/[^a-zA-Z0-9]/g, '').toUpperCase()

    if (cleanTag.length !== 10) {
      return null
    }

    const unit = cleanTag.substring(0, 1)
    const area = cleanTag.substring(1, 5)
    const equipCode = cleanTag.substring(5, 7)
    const seqNumber = cleanTag.substring(7, 10)

    const formattedTag = `${unit}-${area}-${equipCode}-${seqNumber}`

    return formattedTag
  }

  async function sendNotes() {
    if (!notes || !equipments) {
      return
    }
    const formattedNotes: Note[] = notes.map((note) => {
      const formattedTag = formatTag(note.equipment_tag)
      console.log(formattedTag)
      const equipmentFind = equipments.find(
        (equipment) => equipment.tag === formattedTag,
      )

      return equipmentFind ? { ...note, equipmentId: equipmentFind.id } : note
    })

    console.log(formattedNotes)
    try {
      await postNotesMutate(formattedNotes)
      toast.success('Dados enviados com sucesso!')
    } catch (err) {
      toast.error('Erro ao enviar os dados!')
    }
  }

  return (
    <div className="mb-20 flex flex-col items-center">
      <h1 className="my-5 text-center text-2xl font-semibold md:text-4xl">
        Subir notas
      </h1>

      <UploadFile
        className="flex h-16 w-80 cursor-pointer items-center justify-center gap-2 rounded border-2 border-dashed border-green-600 text-lg font-medium text-green-600 transition-colors hover:border-green-500 hover:text-green-500"
        updateFile={changeFile}
      >
        <FileXls size={32} /> {file ? file.name : 'Subir arquivo em excel'}
      </UploadFile>
      <span className="text-sm font-medium text-red-600">
        Importante! a planilha precisa conter os campos:
      </span>
      <span className="text-sm font-medium text-red-600">
        Autor da nota | Descrição | Loc.instalação Nota | Oportunidade
      </span>
      <div className="mt-5 h-96 overflow-y-auto">
        <table className="text-left">
          <thead>
            <tr>
              <th className="border border-slate-300 p-2">Data de criação</th>
              <th className="border border-slate-300 p-2">Numero da nota</th>
              <th className="border border-slate-300 p-2">Autor</th>
              <th className="border border-slate-300 p-2">Descrição</th>
              <th className="border border-slate-300 p-2">
                Tag do equipamento
              </th>
              <th className="border border-slate-300 p-2">Oportunidade</th>
            </tr>
          </thead>
          <tbody className="[&>*:nth-child(odd)]:bg-slate-200">
            {notes?.map((note) => (
              <tr key={note.id}>
                <th className="border border-slate-300 p-2 font-normal">
                  {dayjs(note.createdAt).format('DD-MM-YYYY')}
                </th>
                <th className="border border-slate-300 p-2 font-normal">
                  {note.id}
                </th>
                <th className="border border-slate-300 p-2 font-normal">
                  {note.author}
                </th>
                <th className="border border-slate-300 p-2 font-normal">
                  {note.description}
                </th>
                <th className="border border-slate-300 p-2 font-normal">
                  {note.equipment_tag}
                </th>
                <th className="border border-slate-300 p-2 font-normal">
                  {note.opportunity}
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Button
        disabled={!notes || !equipments}
        className="mt-8"
        onClick={sendNotes}
      >
        Enviar notas
      </Button>
    </div>
  )
}

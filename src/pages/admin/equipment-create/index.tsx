import { toast } from 'react-toastify'
import { AxiosError } from 'axios'
import { redirect } from 'react-router-dom'

import { postEquipment } from '@/api/post-equipment'
import { uploadImages } from '@/api/upload-images'
import { useMutation } from '@tanstack/react-query'

import {
  EquipmentForm,
  CreateEquipmentFormSchema,
} from '@/components/equipment-form'

export function EquipmentCreate() {
  const { mutateAsync: createEquipment, isPending: isPendingCreateEquipment } =
    useMutation({
      mutationFn: postEquipment,
    })
  const { mutateAsync: uploadImagesFn, isPending: isPendingUploadImage } =
    useMutation({
      mutationFn: uploadImages,
    })
  const isPendingRequest = isPendingCreateEquipment || isPendingUploadImage

  async function handleForm({
    tag,
    name,
    description,
    files,
  }: CreateEquipmentFormSchema) {
    const { unit, area, equipCode, seqNumber } = tag
    const tagString = `${unit}-${area}-${equipCode}-${seqNumber}`

    try {
      const formData = new FormData()
      files?.forEach(({ file }) => {
        formData.append('file', file, file.name)
      })
      const haveFiles = files?.length !== 0
      const photos = haveFiles ? await uploadImagesFn(formData) : undefined

      const { id } = await createEquipment({
        tag: tagString,
        name,
        description,
        photos,
      })

      redirect(`admin/equipment/created/${id}`)
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 409) {
          toast.error('Já existe um equipamento com essa TAG.')

          return
        }
      }

      toast.error('Erro ao criar o equipamento, tente novamente mais tarde.')
    }
  }

  return (
    <div>
      <h1 className="mx-6 my-5 text-center text-2xl font-semibold md:text-4xl">
        Adicionar novo equipamento
      </h1>

      <EquipmentForm
        isPendingRequest={isPendingRequest}
        sendForm={handleForm}
      />
    </div>
  )
}

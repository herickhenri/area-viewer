import { toast } from 'react-toastify'
import { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'

import { postEquipment } from '@/api/post-equipment'
import { uploadImages } from '@/api/upload-images'
import { useMutation } from '@tanstack/react-query'

import {
  EquipmentForm,
  CreateEquipmentFormSchema,
} from '@/components/equipment-form'

export function EquipmentCreate() {
  const navigate = useNavigate()

  const {
    mutateAsync: postEquipmentMutate,
    isPending: isPendingPostEquipment,
  } = useMutation({
    mutationFn: postEquipment,
  })
  const { mutateAsync: uploadImagesMutate, isPending: isPendingUploadImage } =
    useMutation({
      mutationFn: uploadImages,
    })

  const isPendingRequest = isPendingPostEquipment || isPendingUploadImage

  async function handleForm({
    tag,
    name,
    description,
    files,
  }: CreateEquipmentFormSchema) {
    const { unit, area, equipCode, seqNumber } = tag
    const tagString = `${unit}-${area}-${equipCode}-${seqNumber}`

    try {
      const formData = files && createFormData(files)
      const photos = formData && (await uploadImagesMutate(formData))

      const { id } = await postEquipmentMutate({
        tag: tagString,
        name,
        description,
        photos,
      })

      toast.success('Equipamento criado com sucesso.')
      navigate(`/admin/equipment/info/${id}`)
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

  function createFormData(files: { file: File }[]) {
    const formData = new FormData()
    files?.forEach(({ file }) => {
      formData.append('file', file, file.name)
    })

    return formData
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

import { toast } from 'react-toastify'
import { AxiosError } from 'axios'
import { redirect, useParams } from 'react-router-dom'
import { useMutation, useQuery } from '@tanstack/react-query'

import { uploadImages } from '@/api/upload-images'
import { getEquipment } from '@/api/get-equipment'

import {
  CreateEquipmentFormSchema,
  EquipmentForm,
} from '@/components/equipment-form'
import { deleteImages } from '@/api/delete-images'
import { updateEquipment } from '@/api/update-equipment'

type Image = {
  link: string
  key: string
  isRemove: boolean
}

export function EquipmentEdit() {
  const { id } = useParams()

  const { data: equipment } = useQuery({
    queryKey: ['equipment'],
    queryFn: () => getEquipment(id!),
    gcTime: 0,
  })
  const {
    mutateAsync: updateEquipmentFn,
    isPending: isPendingUpdateEquipment,
  } = useMutation({
    mutationFn: updateEquipment,
  })
  const { mutateAsync: uploadImagesFn, isPending: isPendingUploadImages } =
    useMutation({
      mutationFn: uploadImages,
    })
  const { mutateAsync: deleteImagesFn, isPending: isPendingDeleteImages } =
    useMutation({
      mutationFn: deleteImages,
    })
  const isPendingRequest =
    isPendingUpdateEquipment || isPendingUploadImages || isPendingDeleteImages

  async function handleForm({
    tag,
    name,
    description,
    files,
    images,
  }: CreateEquipmentFormSchema) {
    const { unit, area, equipCode, seqNumber } = tag
    const tagString = `${unit}-${area}-${equipCode}-${seqNumber}`

    try {
      const deleteImageKeys = getDeleteImageKeys(images)
      deleteImageKeys && (await deleteImagesFn(deleteImageKeys))

      const haveFiles = files?.length !== 0
      const formData = buildFormData(files)
      const newPhotos = haveFiles ? await uploadImagesFn(formData) : undefined

      const savedPhotos = getSavedPhotos(images)

      const photos = savedPhotos.concat(newPhotos || [])

      await updateEquipmentFn({
        id: id!,
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

  function buildFormData(files?: { file: File }[]) {
    const formData = new FormData()
    files?.forEach(({ file }) => {
      formData.append('file', file, file.name)
    })
    return formData
  }

  function getSavedPhotos(images?: Image[]) {
    const savedPhotos =
      images
        ?.filter((image) => !image.isRemove)
        .map(({ key, link }) => ({
          key,
          link,
        })) || []

    return savedPhotos
  }

  function getDeleteImageKeys(images?: Image[]) {
    const imageKeys = images
      ?.filter((image) => image.isRemove)
      .map((image) => image.key)

    return imageKeys
  }

  // TODO: Create page loading
  if (!equipment) {
    return
  }

  console.log(equipment)

  return (
    <div>
      <h1 className="mx-6 my-5 text-center text-2xl font-semibold md:text-4xl">
        Editar um equipamento
      </h1>

      <EquipmentForm
        isPendingRequest={isPendingRequest}
        sendForm={handleForm}
        equipment={equipment}
      />
    </div>
  )
}

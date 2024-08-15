import { toast } from 'react-toastify'
import { AxiosError } from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQuery } from '@tanstack/react-query'
import { getEquipment } from '@/api/get-equipment'
import { updateEquipment } from '@/api/update-equipment'
import {
  CreateEquipmentFormSchema,
  EquipmentForm,
} from '@/components/equipment-form'
import { Title } from '@/components/title'

export function EquipmentEdit() {
  const navigate = useNavigate()
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
      const photos = images
        ?.filter((image) => !image.isRemove)
        .map(({ key, link }) => ({ key, link }))

      const formData = new FormData()
      files?.forEach(({ file }) => {
        formData.append(file.name, file, file.name)
      })
      formData.append('photos', JSON.stringify(photos))
      formData.append('name', name)
      formData.append('tag', tagString)
      description && formData.append('description', description)

      await updateEquipmentFn({
        id: id!,
        formData,
      })

      toast.success('Equipamento editado com sucesso.')
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

  // TODO: Create page loading
  if (!equipment) {
    return
  }

  return (
    <div>
      <Title>Editar um equipamento</Title>

      <EquipmentForm
        isPendingRequest={isPendingUpdateEquipment}
        sendForm={handleForm}
        equipment={equipment}
      />
    </div>
  )
}

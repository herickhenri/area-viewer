import { toast } from 'react-toastify'
import { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'

import { postEquipment } from '@/api/post-equipment'
import { useMutation } from '@tanstack/react-query'

import {
  EquipmentForm,
  CreateEquipmentFormSchema,
} from '@/components/equipment-form'
import { Title } from '@/components/title'

export function EquipmentCreate() {
  const navigate = useNavigate()

  const {
    mutateAsync: postEquipmentMutate,
    isPending: isPendingPostEquipment,
  } = useMutation({
    mutationFn: postEquipment,
  })

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
      formData.append('name', name)
      formData.append('tag', tagString)
      description && formData.append('description', description)
      files?.forEach(({ file }) => {
        formData.append('file', file, file.name)
      })

      const { id } = await postEquipmentMutate(formData)

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

  return (
    <div>
      <Title>Adicionar novo equipamento</Title>

      <EquipmentForm
        isPendingRequest={isPendingPostEquipment}
        sendForm={handleForm}
      />
    </div>
  )
}

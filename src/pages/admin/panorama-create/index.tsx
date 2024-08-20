import { createPanorama } from '@/api/post-panorama'
import {
  PanoramaForm,
  CreatePanoramaFormData,
} from '@/components/panorama-form'
import { Title } from '@/components/title'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export function PanoramaCreate() {
  const navigate = useNavigate()

  const { mutateAsync: createPanoramaFn, isPending: isPendingCreatePanorama } =
    useMutation({
      mutationFn: createPanorama,
    })

  async function handleForm({
    name,
    file,
    equipments,
  }: CreatePanoramaFormData) {
    try {
      if (!file) {
        throw new Error()
      }

      const formData = new FormData()
      formData.append('file', file, file.name)
      formData.append('name', name)
      formData.append('equipments', JSON.stringify(equipments))

      const { id } = await createPanoramaFn(formData)

      toast.success('Panorama criado com sucesso.')
      navigate(`/admin/panorama/info/${id}`)
    } catch (error) {
      console.log(error)
      toast.error(
        'Não foi possível criar o panorama. Tente novamente mais tarde!',
      )
    }
  }

  return (
    <div>
      <Title>Adicionar novo panorama</Title>

      <PanoramaForm
        sendForm={handleForm}
        isPendingRequest={isPendingCreatePanorama}
      />
    </div>
  )
}

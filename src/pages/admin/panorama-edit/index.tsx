import { getPanorama } from '@/api/get-panorama'
import { updatePanorama } from '@/api/update-panorama'
import {
  PanoramaForm,
  CreatePanoramaFormData,
} from '@/components/panorama-form'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Title } from '@/components/title'

export function PanoramaEdit() {
  const navigate = useNavigate()

  const [searchParams] = useSearchParams()
  const id = searchParams.get('nodeId')

  const { data: panorama } = useQuery({
    queryKey: ['panorama', id],
    queryFn: () => getPanorama(id!),
    gcTime: 0,
  })

  const {
    mutateAsync: updatePanoramaMutate,
    isPending: isPendingUpdatePanorama,
  } = useMutation({
    mutationFn: updatePanorama,
  })

  async function handleForm({
    name,
    file,
    equipments,
  }: CreatePanoramaFormData) {
    try {
      const formData = new FormData()
      formData.append('name', name)
      file && formData.append('file', file)
      equipments && formData.append('equipments', JSON.stringify(equipments))

      await updatePanoramaMutate({ id: id!, formData })

      toast.success('Panorama editado com sucesso')
      navigate(`/admin/panorama/info/${id}`)
    } catch (error) {
      toast.error(
        'Não foi possível criar o panorama. Tente novamente mais tarde!',
      )
    }
  }

  if (!panorama) {
    return // TODO: Page loading or error
  }

  return (
    <div>
      <Title>Editar panorama</Title>

      <PanoramaForm
        sendForm={handleForm}
        data={panorama}
        isPendingRequest={isPendingUpdatePanorama}
      />
    </div>
  )
}

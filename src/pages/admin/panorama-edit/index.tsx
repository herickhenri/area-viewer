import { getPanorama } from '@/api/get-panorama'
import { uploadImage } from '@/api/upload-image'
import { updatePanorama } from '@/api/update-panorama'
import {
  PanoramaForm,
  createPanoramaFormData,
} from '@/components/panorama-form'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { deleteImage } from '@/api/delete-image'

export function PanoramaEdit() {
  const navigate = useNavigate()

  const { id } = useParams()

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
  const { mutateAsync: uploadImageMutate, isPending: isPendingUploadImage } =
    useMutation({
      mutationFn: uploadImage,
    })
  const { mutateAsync: deleteImageMutate, isPending: isPendingDeleteImage } =
    useMutation({
      mutationFn: deleteImage,
    })

  const isPendingRequest =
    isPendingUpdatePanorama || isPendingDeleteImage || isPendingUploadImage

  async function handleForm({ name, file, markings }: createPanoramaFormData) {
    try {
      const formData = file && createFormData(file)

      const image = formData && (await uploadImageMutate(formData))

      if (image && panorama) {
        await deleteImageMutate(panorama.image_key)
      }

      await updatePanoramaMutate({
        id: id!,
        name,
        image_key: image?.key,
        image_link: image?.link,
        markings,
      })

      toast.success('Panorama editado com sucesso')
      navigate(`/admin/panorama/info/${id}`)
    } catch (error) {
      toast.error(
        'Não foi possível criar o panorama. Tente novamente mais tarde!',
      )
    }
  }

  function createFormData(file: File) {
    const formData = new FormData()
    formData.append('file', file, file.name)

    return formData
  }

  if (!panorama) {
    return // TODO: Page loading or error
  }

  return (
    <div>
      <h1 className="my-5 text-center text-2xl font-semibold md:text-4xl">
        Editar panorama
      </h1>

      <PanoramaForm
        sendForm={handleForm}
        data={panorama}
        isPendingRequest={isPendingRequest}
      />
    </div>
  )
}

import { createPanorama } from '@/api/post-panorama'
import { uploadImage } from '@/api/upload-image'
import {
  PanoramaForm,
  createPanoramaFormData,
} from '@/components/panorama-form'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export function PanoramaCreate() {
  const navigate = useNavigate()

  const { mutateAsync: createPanoramaFn, isPending: isPendingCreatePanorama } =
    useMutation({
      mutationFn: createPanorama,
    })
  const { mutateAsync: uploadImageFn, isPending: isPendingUploadImage } =
    useMutation({
      mutationFn: uploadImage,
    })

  const isPendingRequest = isPendingCreatePanorama || isPendingUploadImage

  async function handleForm({ name, file, markings }: createPanoramaFormData) {
    try {
      const formData = new FormData()
      formData.append('file', file, file.name)
      const image = await uploadImageFn(formData)

      const { id } = await createPanoramaFn({
        name,
        image_key: image.key,
        image_link: image.link,
        markings,
      })

      navigate(`/admin/panorama/created/${id}`)
    } catch (error) {
      console.log(error)
      toast.error(
        'Não foi possível criar o panorama. Tente novamente mais tarde!',
      )
    }
  }

  return (
    <div>
      <h1 className="my-5 text-center text-2xl font-semibold md:text-4xl">
        Adicionar novo panorama
      </h1>

      <PanoramaForm sendForm={handleForm} isPendingRequest={isPendingRequest} />
    </div>
  )
}

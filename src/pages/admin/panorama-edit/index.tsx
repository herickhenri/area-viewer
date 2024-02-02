import { getPanorama } from '@/api/get-panorama'
import { uploadImage } from '@/api/upload-image'
import { updatePanorama } from '@/api/update-panorama'
import {
  PanoramaForm,
  createPanoramaFormData,
} from '@/components/panorama-form'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { deleteImage } from '@/api/delete-image'

export function PanoramaEdit() {
  const { id } = useParams()

  const { data: panorama } = useQuery({
    queryKey: ['panorama'],
    queryFn: () => getPanorama(id!),
  })

  const { mutateAsync: updatePanoramaFn } = useMutation({
    mutationFn: updatePanorama,
  })
  const { mutateAsync: uploadImageFn } = useMutation({
    mutationFn: uploadImage,
  })
  const { mutateAsync: deleteImageFn } = useMutation({
    mutationFn: deleteImage,
  })

  async function handleForm({ name, file, markings }: createPanoramaFormData) {
    try {
      const formData = new FormData()
      formData.append('file', file, file.name)
      const image = await uploadImageFn(formData)

      panorama && (await deleteImage(panorama.image_key))

      await updatePanoramaFn({
        id: id!,
        name,
        image_key: image.key,
        image_link: image.link,
        markings,
      })
    } catch (error) {
      console.log(error)
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
      <h1 className="my-5 text-center text-2xl font-semibold md:text-4xl">
        Editar panorama
      </h1>

      <PanoramaForm sendForm={handleForm} data={panorama} />
    </div>
  )
}

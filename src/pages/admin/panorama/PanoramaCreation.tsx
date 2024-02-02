import { PanoramaForm } from '@/components/admin/panorama/PanoramaForm'
import { api } from '@/lib/axios'
import { Panorama } from '@/types/Panorama'
import { toast } from 'react-toastify'

export function PanoramaCreation() {
  async function createPanorama({
    name,
    gps_x,
    gps_y,
    image,
    markings,
  }: Panorama) {
    api
      .post('/panorama', {
        name,
        image,
        gps_x,
        gps_y,
        markings,
      })
      .then(() => {
        toast.success('Panorama criado com sucesso!')
      })
      .catch((err) => {
        console.error(err)
        toast.error('Erro ao criar o panorama!')
      })
  }

  return (
    <div>
      <h1 className="my-5 text-center text-2xl font-semibold md:text-4xl">
        "Adicionar novo panorama"
      </h1>

      <PanoramaForm handleData={createPanorama} />
    </div>
  )
}

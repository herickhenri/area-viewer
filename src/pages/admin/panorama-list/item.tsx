import { deletePanorama } from '@/api/delete-panorama'
import { Button } from '@/components/button'
import { Panorama } from '@/types/Panorama'
import { useMutation } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { DeleteWarning } from './delete-warning'
import { queryClient } from '@/lib/query-client'

interface itemProps {
  panorama: Panorama
}

export function Item({ panorama }: itemProps) {
  const { mutateAsync: deletePanoramaMutate } = useMutation({
    mutationFn: deletePanorama,
    onSuccess() {
      queryClient.setQueryData<Panorama[]>(['panoramas'], (oldData) => {
        const newData = oldData?.filter(({ id }) => id !== panorama.id)
        return newData
      })
    },
  })

  async function handleDeletePanorama() {
    try {
      await deletePanoramaMutate(panorama.id)

      toast.success('Panorama deletado com sucesso.')
    } catch (err) {
      console.error(err)

      toast.error('Erro ao deletar o panorama.')
    }
  }

  return (
    <div key={panorama.id}>
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-lg">{panorama.name}</h2>
      </div>
      <img
        className="h-40 w-full rounded object-cover md:h-80 md:rounded-lg"
        src={panorama.images[panorama.images.length - 1].link}
        alt=""
      />
      <div className="mt-2 flex justify-start gap-4">
        <Link to={`/admin/panorama/edit?panoramaId=${panorama.id}`}>
          <Button>Editar</Button>
        </Link>
        <Link
          to={`/admin/panorama/connections?main_panorama_id=${panorama.id}`}
        >
          <Button>Conectar</Button>
        </Link>
        <DeleteWarning deletePanorama={handleDeletePanorama} />
      </div>
    </div>
  )
}

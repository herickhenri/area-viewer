import { useMutation } from '@tanstack/react-query'
import { ConnectForm, panoramaConnectFormData } from './connect-form'
import { connectPanoramas } from '@/api/connect-panorama'
import { toast } from 'react-toastify'
import { queryClient } from '@/lib/query-client'
import { Panorama } from '@/types/Panorama'

type Link = {
  panorama_id: string
  panorama_connect_id: string
  coord_x: number
  coord_y: number
}

export function PanoramaConnect() {
  const { mutateAsync: connectPanoramasMutate, isPending } = useMutation({
    mutationKey: ['connection'],
    mutationFn: connectPanoramas,
    onSuccess: (_, { connection }) => {
      queryClient.setQueryData<Panorama[]>(['panoramas'], (oldData) => {
        const newData = oldData?.map((panorama) => {
          if (panorama.id === connection[0].panorama_id) {
            const newLink = connection[0]
            const newLinks = panorama.links?.concat(newLink || ({} as Link))

            return { ...panorama, links: newLinks }
          }

          if (panorama.id === connection[1].panorama_id) {
            const newLink = connection[1]
            const newLinks = panorama.links?.concat(newLink || ({} as Link))

            return { ...panorama, links: newLinks }
          }

          return panorama
        })

        return newData
      })
    },
  })

  async function handleForm({ connection }: panoramaConnectFormData) {
    const connectionFormatted: [Link, Link] = [
      {
        panorama_id: connection[0].panorama_id,
        coord_x: connection[0].coordinates.x,
        coord_y: connection[0].coordinates.y,
        panorama_connect_id: connection[1].panorama_id,
      },
      {
        panorama_id: connection[1].panorama_id,
        coord_x: connection[1].coordinates.x,
        coord_y: connection[1].coordinates.y,
        panorama_connect_id: connection[0].panorama_id,
      },
    ]

    try {
      await connectPanoramasMutate({ connection: connectionFormatted })
      toast.success('Panoramas conectados com sucesso!')
    } catch (err) {
      console.error(err)
      toast.error('Erro ao criar conexão!')
    }
  }

  return <ConnectForm handleForm={handleForm} isPending={isPending} />
}

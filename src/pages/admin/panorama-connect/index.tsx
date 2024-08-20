import { useMutation } from '@tanstack/react-query'
import { ConnectForm, PanoramaConnectFormData } from './connect-form'
import { connectPanoramas } from '@/api/connect-panorama'
import { toast } from 'react-toastify'
import { queryClient } from '@/lib/query-client'
import { Connection, Panorama } from '@/types/Panorama'
import { Title } from '@/components/title'

export function PanoramaConnect() {
  const { mutateAsync: connectPanoramasMutate, isPending } = useMutation({
    mutationKey: ['connection'],
    mutationFn: connectPanoramas,
    // onSuccess: (_, { connections }) => {
    //   queryClient.setQueryData<Panorama[]>(['panoramas'], (oldData) => {
    //     function updateConnections(panorama: Panorama) {
    //       const newConnectionFrom = connections[0]
    //       const newConnectionTo = connections[1]
    //       const newConnectionsFrom = panorama.connections_from?.concat(
    //         newConnectionFrom || ({} as Connection),
    //       )
    //       const newConnectionsTo = panorama.connections_to?.concat(
    //         newConnectionTo || ({} as Connection),
    //       )

    //       return {
    //         ...panorama,
    //         connections_from: newConnectionsFrom,
    //         connections_to: newConnectionsTo,
    //       }
    //     }

    //     const newData = oldData?.map((panorama) => {
    //       if (panorama.id === connections[0].connected_from_id) {
    //         const newPanorama = updateConnections(panorama)
    //         return newPanorama
    //       }

    //       if (panorama.id === connections[1].connected_from_id) {
    //         const newPanorama = updateConnections(panorama)
    //         return newPanorama
    //       }

    //       return panorama
    //     })

    //     return newData
    //   })
    // },
  })

  async function handleForm({
    main_position,
    secondary_position,
    main_panorama_id,
    secondary_panorama_id,
  }: PanoramaConnectFormData) {
    try {
      const mainConnection = {
        connected_from_id: main_panorama_id,
        connected_to_id: secondary_panorama_id,
        ...main_position,
      }
      const secondaryConnection = {
        connected_from_id: secondary_panorama_id,
        connected_to_id: main_panorama_id,
        ...secondary_position,
      }

      await connectPanoramasMutate({
        connections: [mainConnection, secondaryConnection],
      })
      toast.success('Panoramas conectados com sucesso!')
    } catch (err) {
      console.error(err)
      toast.error('Erro ao criar conexão!')
    }
  }

  return (
    <div>
      <Title>Conectar panoramas</Title>
      <ConnectForm handleForm={handleForm} isPending={isPending} />
    </div>
  )
}

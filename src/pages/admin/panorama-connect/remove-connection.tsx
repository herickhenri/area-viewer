import { deleteConnection } from '@/api/delete-connection'
import { queryClient } from '@/lib/query-client'
import { Panorama } from '@/types/Panorama'
import { CircleNotch, Trash } from '@phosphor-icons/react'
import * as Tooltip from '@radix-ui/react-tooltip'
import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { toast } from 'react-toastify'

interface RemoveConnectionProps {
  icon: React.ElementType
  name: string
  connection: {
    panorama_id: string
    panorama_connect_id: string
  }
}

export function RemoveConnection({
  icon: Icon,
  name,
  connection,
}: RemoveConnectionProps) {
  const { mutateAsync: deleteConnectionMutate, isPending } = useMutation({
    mutationKey: ['deleteConnection'],
    mutationFn: deleteConnection,
    onSuccess: () => {
      queryClient.setQueryData<Panorama[]>(['panoramas'], (oldData) => {
        const { panorama_id, panorama_connect_id } = connection

        const newData = oldData?.map((panorama) => {
          // filters panoramas that are not part of the connection
          if (
            panorama.id !== panorama_id &&
            panorama.id !== panorama_connect_id
          ) {
            return panorama
          }

          // remove the connection links from the panorama
          const newLinks = panorama.links
            ?.filter((link) => link.panorama_connect_id !== panorama_connect_id)
            .filter((link) => link.panorama_connect_id !== panorama_id)

          // returns the panorama with the filtered links
          return { ...panorama, links: newLinks }
        })

        return newData
      })
    },
  })

  function removeConnection() {
    try {
      deleteConnectionMutate(connection)

      toast.success('Conexão deletada com sucesso!')
    } catch (err) {
      console.error(err)
      toast.error(
        'Não foi possível deletar a conexão! Tente novamente mais tarde.',
      )
    }
  }

  return (
    <Tooltip.Provider delayDuration={100}>
      <Tooltip.Root>
        <Tooltip.Trigger>
          <Icon className=" h-4 w-4 fill-white md:h-12 md:w-12" />
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content className="flex items-center gap-2 rounded bg-slate-100 p-1">
            <span className=" rounded-sm text-center text-black">{name}</span>
            {isPending ? (
              <CircleNotch className="animate-spin text-red-600" size={'24'} />
            ) : (
              <Trash
                className="cursor-pointer text-red-600 transition-colors hover:text-red-500"
                size={24}
                onClick={removeConnection}
              />
            )}
            <Tooltip.Arrow className="fill-slate-200" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  )
}

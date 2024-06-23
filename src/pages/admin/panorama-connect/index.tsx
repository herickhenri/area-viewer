import { useMutation, useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { Item, SelectInput } from './select-input'
import { getPanoramas } from '@/api/get-panoramas'
import { Button } from '@/components/button'
import { PanoramaArea } from './panorama-area'
import { z } from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'
import { connectPanoramas } from '@/api/connect-panorama'
import { useEffect } from 'react'
import { CircleNotch } from '@phosphor-icons/react'
import { queryClient } from '@/lib/query-client'
import { Panorama } from '@/types/Panorama'

const linkSchema = z.object({
  panorama_id: z.string().min(1, 'O panorama principal é obrigatório'),
  panorama_connect_id: z.string().min(1, 'O panorama secundário é obrigatório'),
  coord_x: z.number(),
  coord_y: z.number(),
})

export type Link = z.infer<typeof linkSchema>

const panoramaConnectFormSchema = z.object({
  connection: z.tuple([linkSchema, linkSchema]),
})

export type panoramaConnectFormData = z.infer<typeof panoramaConnectFormSchema>

export function PanoramaConnect() {
  const { id: mainPanoramaId } = useParams()
  const { data: panoramas } = useQuery({
    queryKey: ['panoramas'],
    queryFn: getPanoramas,
  })
  const { mutateAsync: connectPanoramasMutate, isPending } = useMutation({
    mutationKey: ['connection'],
    mutationFn: connectPanoramas,
    onSuccess: () => {
      queryClient.setQueryData<Panorama[]>(['panoramas'], (oldData) => {
        const newData = oldData?.map((panorama) => {
          if (panorama.id === mainPanoramaId) {
            const newLink = getValues('connection.0')
            const newLinks = panorama.links?.concat(newLink || ({} as Link))

            return { ...panorama, links: newLinks }
          }

          if (panorama.id === secondaryPanoramaId) {
            const newLink = getValues('connection.1')
            const newLinks = panorama.links?.concat(newLink || ({} as Link))

            return { ...panorama, links: newLinks }
          }

          return panorama
        })

        return newData
      })
    },
  })

  const { control, watch, setValue, resetField, handleSubmit, getValues } =
    useForm<panoramaConnectFormData>({
      resolver: zodResolver(panoramaConnectFormSchema),
      defaultValues: {
        connection: [
          {
            panorama_id: mainPanoramaId,
          },
          {
            panorama_connect_id: mainPanoramaId,
          },
        ],
      },
    })

  const mainPanorama = panoramas?.find(
    (panorama) => panorama.id === mainPanoramaId,
  )
  const secondaryPanoramaId = watch('connection.1.panorama_id')
  const secondaryPanorama = panoramas?.find(
    (panorama) => panorama.id === secondaryPanoramaId,
  )

  useEffect(() => {
    secondaryPanorama &&
      setValue('connection.0.panorama_connect_id', secondaryPanorama.id)

    const secondaryLink = secondaryPanorama?.links?.find(
      (link) => link.panorama_connect_id === mainPanorama?.id,
    )
    const mainLink = mainPanorama?.links?.find(
      (link) => link.panorama_connect_id === secondaryPanorama?.id,
    )

    function handlePoints() {
      // checks if the secondary panorama has connection to the main panorama

      if (!mainLink || !secondaryLink) {
        // resetPoints
        return
      }

      // set values that exist between the two panoramas
      setValue('connection.0.coord_x', mainLink.coord_x)
      setValue('connection.0.coord_y', mainLink.coord_y)
      setValue('connection.1.coord_x', secondaryLink.coord_x)
      setValue('connection.1.coord_y', secondaryLink.coord_y)
    }

    handlePoints()
  }, [secondaryPanorama, mainPanorama, resetField, setValue])

  if (!panoramas) {
    return <h1>carregando...</h1>
  }

  if (!mainPanorama) {
    return <h1>Panorama não econtrado</h1>
  }

  async function handleForm({ connection }: panoramaConnectFormData) {
    try {
      await connectPanoramasMutate({ connection })
      toast.success('Panoramas conectados com sucesso!')
    } catch (err) {
      console.error(err)
      toast.error('Erro ao criar conexão!')
    }
  }

  const panoramaOptions = panoramas
    .filter((panorama) => panorama.id !== mainPanorama.id)
    .map((panorama) => {
      const item: Item = {
        label: panorama.name,
        value: panorama.id,
      }
      return item
    })

  const allPointMainPanorama = mainPanorama.links
    ?.filter((link) => link.panorama_connect_id !== secondaryPanoramaId)
    .map(({ coord_x, coord_y, panorama_connect_id }) => {
      // get the name of the panorama connected to the main panorama
      const panorama = panoramas.find(
        (panorama) => panorama.id === panorama_connect_id,
      )
      const name = panorama?.name || ''
      return {
        panorama_connect_id,
        coord_x,
        coord_y,
        name,
      }
    })

  return (
    <form className="mb-10" onSubmit={handleSubmit(handleForm)}>
      <h1 className="mx-6 my-5 text-center text-2xl font-semibold md:text-4xl">
        Conectar panoramas
      </h1>

      <div className="mx-5 flex flex-1 flex-col gap-5 md:mx-56">
        <div className="relative">
          <span>{mainPanorama.name}</span>
          <Controller
            control={control}
            name="connection.0"
            render={({ field }) => (
              <PanoramaArea
                source={mainPanorama.image_link}
                value={field.value}
                onChange={field.onChange}
                points={allPointMainPanorama}
              />
            )}
          />
        </div>
        <Controller
          control={control}
          name="connection.1.panorama_id"
          render={({ field }) => (
            <SelectInput
              options={panoramaOptions}
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />

        <div className="relative">
          {secondaryPanorama ? (
            <Controller
              control={control}
              name="connection.1"
              render={({ field }) => (
                <PanoramaArea
                  source={secondaryPanorama.image_link}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          ) : (
            <div className="flex h-64 w-full items-center justify-center rounded bg-slate-300 text-lg text-black/80 md:h-80">
              <span>Selecione um panorama acima</span>
            </div>
          )}
        </div>
      </div>
      {/* <button
        className="mx-5 text-red-500 underline underline-offset-2 transition-colors hover:text-red-700 md:mx-56"
        type="button"
      >
        Remover conexão existente
      </button> */}
      <Button type="submit" className="mx-auto mt-10">
        {isPending ? <CircleNotch className="animate-spin" /> : 'Conectar'}
      </Button>
    </form>
  )
}

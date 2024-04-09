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

const linkSchema = z.object({
  panorama_id: z.string(),
  panorama_connect_id: z.string(),
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
  const { mutateAsync: connectPanoramasMutate } = useMutation({
    mutationKey: ['connection'],
    mutationFn: connectPanoramas,
  })

  const { control, watch, setValue, resetField, handleSubmit } =
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

    function handlePoints() {
      // resetPoints
      resetField('connection.0.coord_x')
      resetField('connection.0.coord_y')
      resetField('connection.1.coord_x')
      resetField('connection.1.coord_y')

      // checks if the secondary panorama has connection to the main panorama
      const secondaryLink = secondaryPanorama?.links?.find(
        (link) => link.panorama_connect_id === mainPanorama?.id,
      )
      const mainLink = mainPanorama?.links?.find(
        (link) => link.panorama_connect_id === secondaryPanorama?.id,
      )

      // set values that exist between the two panoramas
      mainLink && setValue('connection.0.coord_x', mainLink.coord_x)
      mainLink && setValue('connection.0.coord_y', mainLink.coord_y)
      secondaryLink && setValue('connection.1.coord_x', secondaryLink.coord_x)
      secondaryLink && setValue('connection.1.coord_y', secondaryLink.coord_y)
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
      toast.success('Panoramas conectados com sucesso')
    } catch (err) {
      console.error(err)
      toast.error('Erro ao criar conexão')
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
            <div className="flex h-40 w-full items-center justify-center rounded bg-slate-300 text-lg text-black/80 md:h-80">
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
        Conectar
      </Button>
    </form>
  )
}

import { useQuery } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { Item, SelectInput } from './select-input'
import { getPanoramas } from '@/api/get-panoramas'
import { Button } from '@/components/button'
import { PanoramaArea } from './panorama-area'
import { z } from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { CircleNotch } from '@phosphor-icons/react'
import Select from 'react-select'

const linkSchema = z.object({
  panorama_id: z.string({ required_error: 'O panorama é obrigatório' }),
  coordinates: z.object(
    {
      x: z.number(),
      y: z.number(),
    },
    { required_error: 'Marque um local no panorama' },
  ),
})

export type Link = z.infer<typeof linkSchema>

const panoramaConnectFormSchema = z.object({
  connection: z.tuple([linkSchema, linkSchema]),
})

export type panoramaConnectFormData = z.infer<typeof panoramaConnectFormSchema>

interface ConnectFormProps {
  handleForm: ({ connection }: panoramaConnectFormData) => void
  isPending: boolean
}

export function ConnectForm({ handleForm, isPending }: ConnectFormProps) {
  const navigate = useNavigate()
  const { id: mainPanoramaId } = useParams()
  const { data: panoramas } = useQuery({
    queryKey: ['panoramas'],
    queryFn: getPanoramas,
  })

  const {
    control,
    watch,
    setValue,
    resetField,
    handleSubmit,
    formState: { errors },
  } = useForm<panoramaConnectFormData>({
    resolver: zodResolver(panoramaConnectFormSchema),
    defaultValues: {
      connection: [
        {
          panorama_id: mainPanoramaId,
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
        resetField('connection.0.coordinates')
        resetField('connection.1.coordinates')

        return
      }

      // set values that exist between the two panoramas
      setValue('connection.0.coordinates', {
        x: mainLink.coord_x,
        y: mainLink.coord_y,
      })
      setValue('connection.1.coordinates', {
        x: secondaryLink.coord_x,
        y: secondaryLink.coord_y,
      })
    }

    handlePoints()
  }, [secondaryPanorama, mainPanorama, resetField, setValue])

  if (!panoramas) {
    return <h1>carregando...</h1>
  }

  if (!mainPanorama) {
    return <h1>Panorama não econtrado</h1>
  }

  const selectPanoramaOptions = panoramas
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
      const panorama_id = mainPanorama.id

      return {
        panorama_id,
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
        <div>
          <div className="mb-5 flex items-center justify-between rounded border border-black/25 px-2 outline-2 outline-blue-500 focus-within:border-transparent focus-within:outline">
            <Select
              options={selectPanoramaOptions}
              classNames={{
                container: () => 'flex-1',
                control: () => 'border-none shadow-none flex-1',
              }}
              value={{ label: mainPanorama.name, value: mainPanorama.id }}
              onChange={(item) =>
                item && navigate(`/admin/panorama/connect/${item.value}`)
              }
              placeholder="Selecione um panorama"
            />
          </div>
          <Controller
            control={control}
            name="connection.0.coordinates"
            render={({ field }) => (
              <PanoramaArea
                source={mainPanorama.image_link}
                value={field.value}
                onChange={field.onChange}
                points={allPointMainPanorama}
              />
            )}
          />
          {errors.connection?.[0]?.coordinates && (
            <span className="text-sm font-medium text-red-500">
              {errors.connection?.[0]?.coordinates.message}
            </span>
          )}
        </div>
        <Controller
          control={control}
          name="connection.1.panorama_id"
          render={({ field }) => (
            <SelectInput
              options={selectPanoramaOptions}
              value={field.value}
              onChange={field.onChange}
              isError={!!errors.connection?.[1]?.panorama_id}
            />
          )}
        />

        <div className="relative">
          {secondaryPanorama ? (
            <>
              <Controller
                control={control}
                name="connection.1.coordinates"
                render={({ field }) => (
                  <PanoramaArea
                    source={secondaryPanorama.image_link}
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              {errors.connection?.[1]?.coordinates && (
                <span className="text-sm font-medium text-red-500">
                  {errors.connection?.[1]?.coordinates.message}
                </span>
              )}
            </>
          ) : (
            <div className="flex h-64 w-full items-center justify-center rounded bg-slate-300 text-lg text-black/80 md:h-80">
              <span>Selecione um panorama acima</span>
            </div>
          )}
          {errors.connection?.[1]?.panorama_id && (
            <span className="text-sm font-medium text-red-500">
              {errors.connection?.[1]?.panorama_id.message}
            </span>
          )}
        </div>
      </div>
      <Button type="submit" className="mx-auto mt-10">
        {isPending ? <CircleNotch className="animate-spin" /> : 'Conectar'}
      </Button>
    </form>
  )
}

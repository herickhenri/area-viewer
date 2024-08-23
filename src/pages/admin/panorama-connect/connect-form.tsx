import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import { SelectInput } from './select-input'
import { getPanoramas } from '@/api/get-panoramas'
import { Button } from '@/components/button'
import { PanoramaArea } from './panorama-area'
import { z } from 'zod'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CircleNotch } from '@phosphor-icons/react'
import { useEffect } from 'react'

const panoramaConnectFormSchema = z.object({
  main_panorama_id: z.string(),
  secondary_panorama_id: z.string(),
  main_position: z.object({
    yaw: z.number(),
    pitch: z.number(),
  }),
  secondary_position: z.object({
    yaw: z.number(),
    pitch: z.number(),
  }),
})

export type PanoramaConnectFormData = z.infer<typeof panoramaConnectFormSchema>

interface ConnectFormProps {
  handleForm: (data: PanoramaConnectFormData) => void
  isPending: boolean
}

export function ConnectForm({ handleForm, isPending }: ConnectFormProps) {
  const [searchParams] = useSearchParams()
  const main_panorama_id = searchParams.get('main_panorama_id')
  const secondary_panorama_id = searchParams.get('secondary_panorama_id')

  const { data: panoramas } = useQuery({
    queryKey: ['panoramas'],
    queryFn: getPanoramas,
  })

  const newConnectionForm = useForm<PanoramaConnectFormData>({
    resolver: zodResolver(panoramaConnectFormSchema),
    defaultValues: {
      main_panorama_id: main_panorama_id || undefined,
      secondary_panorama_id: secondary_panorama_id || undefined,
    },
  })

  const { handleSubmit, control, resetField, setValue } = newConnectionForm

  const mainPanorama = panoramas?.find(
    (panorama) => panorama.id === main_panorama_id,
  )

  const secondaryPanorama = panoramas?.find(
    (panorama) => panorama.id === secondary_panorama_id,
  )

  useEffect(() => {
    const mainPosition = mainPanorama?.connections_from?.find(
      ({ connected_to_id }) => connected_to_id === secondaryPanorama?.id,
    )
    const secondaryPosition = secondaryPanorama?.connections_from?.find(
      ({ connected_to_id }) => connected_to_id === mainPanorama?.id,
    )

    mainPosition
      ? setValue('main_position', {
          yaw: mainPosition.yaw,
          pitch: mainPosition.pitch,
        })
      : resetField('main_position')
    secondaryPosition
      ? setValue('secondary_position', {
          yaw: secondaryPosition.yaw,
          pitch: secondaryPosition.pitch,
        })
      : resetField('secondary_position')
  }, [mainPanorama, secondaryPanorama, setValue, resetField])

  if (!panoramas) {
    return <h1>carregando...</h1>
  }

  function handleConnectPanorama(data: PanoramaConnectFormData) {
    handleForm(data)
  }

  return (
    <form className="mb-10" onSubmit={handleSubmit(handleConnectPanorama)}>
      <FormProvider {...newConnectionForm}>
        <div className="mx-5 flex flex-1 flex-col gap-5 md:mx-56">
          <Controller
            control={control}
            name="main_panorama_id"
            render={({ field }) => (
              <SelectInput
                panoramas={panoramas}
                defaultPanorama={mainPanorama}
                value={field.value}
                onChange={field.onChange}
                inputName={field.name}
              />
            )}
          />
          {mainPanorama ? (
            <Controller
              control={control}
              name="main_position"
              render={({ field }) => (
                <PanoramaArea
                  panoramas={panoramas}
                  value={field.value}
                  onChangePosition={field.onChange}
                  panorama={mainPanorama}
                />
              )}
            />
          ) : (
            <div className="flex h-64 w-full items-center justify-center rounded bg-slate-300 text-lg text-black/80 md:h-80">
              <span>Selecione um panorama acima</span>
            </div>
          )}

          <Controller
            control={control}
            name="secondary_panorama_id"
            render={({ field }) => (
              <SelectInput
                panoramas={panoramas}
                defaultPanorama={secondaryPanorama}
                value={field.value}
                onChange={field.onChange}
                inputName={field.name}
              />
            )}
          />

          <div className="relative">
            {secondaryPanorama ? (
              <Controller
                control={control}
                name="secondary_position"
                render={({ field }) => (
                  <PanoramaArea
                    panoramas={panoramas}
                    value={field.value}
                    onChangePosition={field.onChange}
                    panorama={secondaryPanorama}
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
        <Button type="submit" className="mx-auto mt-10">
          {isPending ? <CircleNotch className="animate-spin" /> : 'Conectar'}
        </Button>
      </FormProvider>
    </form>
  )
}

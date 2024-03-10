import { useMutation, useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { Item, SelectInput } from './select-input'
import { getPanoramas } from '@/api/get-panoramas'
import { Button } from '@/components/button'
import { PanoramaArea } from './panorama-area'
import { z } from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { updatePanorama } from '@/api/update-panorama'
import { toast } from 'react-toastify'

// regras de negócio
// [x] o primeiro panorama deve ser fixo
// [x] o segundo panorama deve ter mutável
// [x] deve ser possível adicionar um point no primeiro e segundo panorama
// [] so deve ser possível enviar o formulário com os dois panoramas preencidos e com 1 point em cada
// [x] ao trocar o segundo panorama, deve aparecer o point de uma conexão existente, se nao houver, nao devem aparecer points
// [] a cor do point em atual seleção deve ser verde
// [] o primeiro panorama deve mostrar os points de todas as suas conexões, de cor branco e com o nome do panorama encima
// [] todos os points do primeiro deve ter uma marcação com o nome do devido panorama conectado
// [] deve aparecer uma mensagem de sucesso ou erro ao criar/editar um novo point

const panoramaConnectFormSchema = z.object({
  mainLink: z.object({
    id: z.string(),
    coords: z.object({
      coord_x: z.number(),
      coord_y: z.number(),
    }),
  }),
  secondaryLink: z.object({
    id: z.string(),
    coords: z.object({
      coord_x: z.number(),
      coord_y: z.number(),
    }),
  }),
})

export type panoramaConnectFormData = z.infer<typeof panoramaConnectFormSchema>

export function PanoramaConnectForm() {
  const { id: mainPanoramaId } = useParams()
  const { data: panoramas } = useQuery({
    queryKey: ['panorama'],
    queryFn: getPanoramas,
  })
  const { mutateAsync: updatePanoramaMutate } = useMutation({
    mutationKey: ['panorama'],
    mutationFn: updatePanorama,
  })

  const { control, watch, setValue, resetField, handleSubmit } =
    useForm<panoramaConnectFormData>({
      resolver: zodResolver(panoramaConnectFormSchema),
      defaultValues: {
        mainLink: {
          id: mainPanoramaId,
        },
      },
    })

  if (!panoramas) {
    return <h1>carregando...</h1>
  }

  const mainPanorama = panoramas.find(
    (panorama) => panorama.id === mainPanoramaId,
  )

  if (!mainPanorama) {
    return <h1>Panorama não econtrado</h1>
  }

  function handlePoints(value: string) {
    // resetPoints
    resetField('mainLink.coords')
    resetField('secondaryLink.coords')

    // checks if the main panorama has a connection to the secondary panorama
    const mainLink = mainPanorama?.links.find(
      (link) => link.panorama_connect_id === value,
    )

    // takes the secondary panorama from the main panorama
    const secondaryPanorama = panoramas?.find(
      (panorama) => panorama.id === mainLink?.panorama_connect_id,
    )
    // checks if the secondary panorama has connection to the main panorama
    const secondaryLink = secondaryPanorama?.links.find(
      (link) => link.panorama_connect_id === mainPanorama?.id,
    )

    // set values that exist between the two panoramas
    mainLink && setValue('mainLink.coords', mainLink)
    secondaryLink && setValue('secondaryLink.coords', secondaryLink)
  }

  function handleForm(data: panoramaConnectFormData) {
    const mainLink = {
      ...data.mainLink.coords,
      panorama_connect_id: data.secondaryLink.id,
    }

    const mainLinks = mainPanorama?.links
      ? mainPanorama.links
          .filter(
            (link) => link.panorama_connect_id !== mainLink.panorama_connect_id,
          )
          .concat(mainLink)
      : [mainLink]

    const secondaryLink = {
      ...data.secondaryLink.coords,
      panorama_connect_id: data.mainLink.id,
    }
    const secondaryLinks = secondaryPanorama?.links
      ? secondaryPanorama.links
          .filter(
            (link) =>
              link.panorama_connect_id !== secondaryLink.panorama_connect_id,
          )
          .concat(secondaryLink)
      : [secondaryLink]

    updatePanoramaMutate({
      id: secondaryLink.panorama_connect_id,
      links: mainLinks,
    })
    updatePanoramaMutate({
      id: mainLink.panorama_connect_id,
      links: secondaryLinks,
    })

    toast.success('Panoramas conectados com sucesso')
    // sendForm({ mainLinks, secondaryLinks })
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

  const secondaryPanoramaId = watch('secondaryLink.id')
  const secondaryPanorama = panoramas.find(
    (panorama) => panorama.id === secondaryPanoramaId,
  )

  const allPointMainPanorama = mainPanorama.links
    .filter((link) => link.panorama_connect_id !== secondaryPanoramaId)
    .map(({ coord_x, coord_y }) => {
      return {
        coord_x,
        coord_y,
      }
    })

  return (
    <form className="mb-10" onSubmit={handleSubmit(handleForm)}>
      <div className="mx-5 flex flex-1 flex-col gap-5 md:mx-56">
        <div className="relative">
          <Controller
            control={control}
            name="mainLink.coords"
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
          name="secondaryLink.id"
          render={({ field }) => (
            <SelectInput
              options={panoramaOptions}
              value={field.value}
              onChange={(value) => {
                value && handlePoints(value)
                field.onChange(value)
              }}
            />
          )}
        />

        <div className="relative">
          {secondaryPanorama ? (
            <Controller
              control={control}
              name="secondaryLink.coords"
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

      <Button className="mx-auto mt-10">Conectar</Button>
    </form>
  )
}

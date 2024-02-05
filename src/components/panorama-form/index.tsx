import { useState } from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { Panorama } from '@/types/Panorama'
import { Markings } from './markings'
import { PanoramaArea } from './panorama-area'
import { Button } from '../button'
import Input from '../input'
import { zodResolver } from '@hookform/resolvers/zod'
import { UploadPanorama } from './upload-panorama'
import { Camera, CircleNotch, PencilSimple } from '@phosphor-icons/react'
import { Label } from '../label'

export type Coord = {
  coord_x: number
  coord_y: number
}

export type Marking = {
  coord: Coord
  equip_tag: string
}

const createPanoramaFormSchema = z.object({
  name: z.string().trim().min(1, 'O nome é obrigatório'),
  markings: z
    .array(
      z.object({
        equipment_id: z.string(),
        coord_x: z.number(),
        coord_y: z.number(),
      }),
    )
    .optional(),
  file: z.instanceof(File).optional(),
})

export type createPanoramaFormData = z.infer<typeof createPanoramaFormSchema>

interface PanoramaFormProps {
  data?: Panorama
  sendForm: (data: createPanoramaFormData) => void
  isPendingRequest: boolean
}

export function PanoramaForm({
  data,
  sendForm,
  isPendingRequest,
}: PanoramaFormProps) {
  const [coord, setCoord] = useState<Coord | null>(null)

  const markings = data?.markings?.map(({ coord_x, coord_y, equipment }) => ({
    equipment_id: equipment.id,
    coord_x,
    coord_y,
  }))
  const newCycleForm = useForm<createPanoramaFormData>({
    resolver: zodResolver(createPanoramaFormSchema),
    defaultValues: {
      name: data?.name,
      markings,
    },
  })

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = newCycleForm

  function changeCoord(coordenada: Coord | null) {
    setCoord(coordenada)
  }

  const file = watch('file')
  const panoramaSource = file ? URL.createObjectURL(file) : data?.image_link

  return (
    <FormProvider {...newCycleForm}>
      <form
        className="mx-5 mb-10 flex flex-1 flex-col gap-5 md:mx-56"
        action=""
        onSubmit={handleSubmit(sendForm)}
      >
        <Label title="Nome do local:">
          <Input
            error={Boolean(errors.name)}
            type="text"
            placeholder="Nome"
            {...register('name')}
          />
          {errors.name && (
            <span className="text-sm text-red-500">{errors.name.message}</span>
          )}
        </Label>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <span>Foto panorâmica:</span>
            <Controller
              name="file"
              control={control}
              render={({ field }) => (
                <UploadPanorama
                  className="cursor-pointer rounded-full bg-blue-600 p-1 text-white transition-colors hover:bg-blue-700"
                  updatePanoramaFile={field.onChange}
                >
                  <PencilSimple size={24} />
                </UploadPanorama>
              )}
            />
          </div>
          <div className="h-40 cursor-pointer overflow-hidden rounded bg-slate-300 transition-colors hover:bg-slate-400 md:h-80">
            {panoramaSource ? (
              <PanoramaArea
                changeCoord={changeCoord}
                coord={coord}
                source={panoramaSource}
              />
            ) : (
              <Controller
                name="file"
                control={control}
                render={({ field }) => (
                  <UploadPanorama
                    className="flex h-full w-full items-center justify-center"
                    updatePanoramaFile={field.onChange}
                  >
                    <Camera size={32} className="text-black/50" />
                  </UploadPanorama>
                )}
              />
            )}
          </div>
        </div>

        <Markings coord={coord} changeCoord={changeCoord} />

        <Button className="mx-auto h-12 w-40" disabled={isPendingRequest}>
          {isPendingRequest ? (
            <CircleNotch size={24} className="animate-spin" />
          ) : (
            'Confirmar'
          )}
        </Button>
      </form>
    </FormProvider>
  )
}

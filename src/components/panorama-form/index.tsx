import { useState } from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { Panorama } from '@/types/Panorama'
import { PanoramaArea } from './panorama-area'
import { Button } from '../button'
import Input from '../input'
import { zodResolver } from '@hookform/resolvers/zod'
import { UploadPanorama } from './upload-panorama'
import { Camera, CircleNotch, PencilSimple } from '@phosphor-icons/react'
import { Label } from '../label'
import { EquipmentMarkers, MarkerPosition } from './equipment-markers'
import { useQuery } from '@tanstack/react-query'
import { getEquipments } from '@/api/get-equipments'

const createPanoramaFormSchema = z.object({
  name: z.string().trim().min(1, 'O nome é obrigatório'),
  equipments: z
    .array(
      z.object({
        equipment_id: z.string(),
        yaw: z.number(),
        pitch: z.number(),
      }),
    )
    .optional(),
  file: z.instanceof(File).optional(),
})

export type CreatePanoramaFormData = z.infer<typeof createPanoramaFormSchema>

interface PanoramaFormProps {
  data?: Panorama
  sendForm: (data: CreatePanoramaFormData) => void
  isPendingRequest: boolean
}

export function PanoramaForm({
  data,
  sendForm,
  isPendingRequest,
}: PanoramaFormProps) {
  const [markerPosition, setMarkerPosition] = useState<MarkerPosition | null>(
    null,
  )

  const { data: equipments } = useQuery({
    queryKey: ['equipments'],
    queryFn: getEquipments,
  })

  const createPanoramaForm = useForm<CreatePanoramaFormData>({
    resolver: zodResolver(createPanoramaFormSchema),
    defaultValues: {
      name: data?.name,
      equipments: data?.equipments,
    },
  })

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = createPanoramaForm

  const file = watch('file')
  const panoramaSource = file
    ? URL.createObjectURL(file)
    : data?.images[data.images.length - 1].link

  if (!equipments) {
    return <h1>Carregando</h1>
  }

  return (
    <FormProvider {...createPanoramaForm}>
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
          <div className="mx-auto cursor-pointer overflow-hidden rounded transition-colors">
            {panoramaSource ? (
              <PanoramaArea
                equipments={equipments}
                source={panoramaSource}
                markerPosition={markerPosition}
                changeMarkerPosition={setMarkerPosition}
              />
            ) : (
              <Controller
                name="file"
                control={control}
                render={({ field }) => (
                  <UploadPanorama
                    className="mx-auto flex h-64 w-full items-center justify-center rounded border-2 border-dashed border-blue-500 transition-colors hover:border-blue-600"
                    updatePanoramaFile={field.onChange}
                  >
                    <Camera size={32} className="text-black/50" />
                  </UploadPanorama>
                )}
              />
            )}
          </div>
        </div>

        <EquipmentMarkers
          equipments={equipments}
          markerPosition={markerPosition}
          changeMarkerPosition={setMarkerPosition}
        />

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

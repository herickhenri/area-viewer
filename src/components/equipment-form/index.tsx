import { Controller, FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/components/button'
import { CircleNotch } from '@phosphor-icons/react'
import { Label } from '../label'
import Input from '../input'
import { TextArea } from '../textarea'
import { UploadFiles } from './upload-files'
import { Equipment } from '@/types/Equipment'

const CreateEquipmentFormSchema = z.object({
  name: z.string().trim().min(1, 'O nome do equipamento é obrigatório.'),
  description: z.string().optional(),
  tag: z.object({
    unit: z
      .string()
      .toUpperCase()
      .length(1, 'Este campo pode possuir 1 letra.'),
    area: z
      .string()
      .length(4, 'Este campo deve possuir 4 numeros.')
      .refine((area) => Number(area), 'Este campo so pode conter números.'),
    equipCode: z
      .string()
      .toUpperCase()
      .length(2, 'Este campo deve possuir 2 letras.'),
    seqNumber: z
      .string()
      .length(3, 'Este campo deve possuir 3 numeros.')
      .refine((area) => Number(area), 'Este campo so pode conter números.'),
  }),
  files: z
    .array(
      z.object({
        file: z.instanceof(File),
      }),
    )
    .optional(),
  images: z
    .array(
      z.object({
        key: z.string(),
        link: z.string(),
        isRemove: z.boolean(),
      }),
    )
    .optional(),
})

export type CreateEquipmentFormSchema = z.infer<
  typeof CreateEquipmentFormSchema
>

interface equipmentFormProps {
  equipment?: Equipment
  sendForm: (data: CreateEquipmentFormSchema) => void
  isPendingRequest: boolean
}

export function EquipmentForm({
  equipment,
  sendForm,
  isPendingRequest,
}: equipmentFormProps) {
  const tagArray = equipment?.tag.split('-')
  const [unit, area, equipCode, seqNumber] = tagArray || []

  const images = equipment?.photos?.map((photo) => ({
    isRemove: false,
    ...photo,
  }))

  const newCycleForm = useForm<CreateEquipmentFormSchema>({
    resolver: zodResolver(CreateEquipmentFormSchema),
    defaultValues: {
      name: equipment?.name,
      tag: {
        unit: unit || 'I',
        area,
        equipCode,
        seqNumber,
      },
      description: equipment?.description || '',
      images,
    },
  })

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = newCycleForm

  async function handleForm(data: CreateEquipmentFormSchema) {
    sendForm(data)
  }

  return (
    <form
      className="mb-10 flex flex-1 flex-col gap-5 px-6 md:mx-56"
      onSubmit={handleSubmit(handleForm)}
    >
      <Label title="Nome:*">
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

      <Label title="Tag:*">
        <div className="flex w-full items-center gap-2">
          <Input
            className="w-10 text-center"
            type="text"
            disabled
            error={Boolean(errors.tag?.unit)}
            {...register('tag.unit')}
          />
          <span>-</span>
          <Input
            className="w-20 text-center"
            type="text"
            error={Boolean(errors.tag?.area)}
            maxLength={4}
            {...register('tag.area')}
          />
          <span>-</span>
          <Input
            className="w-16 text-center uppercase"
            type="text"
            error={Boolean(errors.tag?.equipCode)}
            maxLength={2}
            {...register('tag.equipCode')}
          />
          <span>-</span>
          <Input
            className="w-16 text-center"
            type="text"
            error={Boolean(errors.tag?.seqNumber)}
            maxLength={3}
            {...register('tag.seqNumber')}
          />
        </div>
        {errors.tag && (
          <span className="text-sm text-red-500">
            Formato de tag incorreto ou campo faltante. Exemplo: I-1501-BB-101
          </span>
        )}
      </Label>

      <Label title="Descrição:">
        <Controller
          control={control}
          name="description"
          render={({ field }) => (
            <TextArea
              placeholder="Descrição"
              value={field.value}
              onChange={(e) => field.onChange(e.target.value)}
            />
          )}
        />
      </Label>

      <FormProvider {...newCycleForm}>
        <UploadFiles />
      </FormProvider>
      <Button className="h-12 w-40" disabled={isPendingRequest} type="submit">
        {isPendingRequest ? (
          <CircleNotch size={24} className="animate-spin" />
        ) : (
          'Confirmar'
        )}
      </Button>
    </form>
  )
}

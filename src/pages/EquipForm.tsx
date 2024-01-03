import { useDropzone } from "react-dropzone";

import { PlusCircle, X } from "@phosphor-icons/react";
import { HeaderAdmin } from "../components/HeaderAdmin";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { useParams } from "react-router-dom";
import { equipamentos } from "../data/DataEquip";

type Photo = {
  source: string
  name: string
}

const newEquipFormSchema = z.object({
  name: z.string(),
  tag: z.object({
    unit: z.string().length(1),
    area: z.string().length(4),
    equipCode: z.string().length(2),
    seqNumber: z.string().length(3),
  }),
  photos: z.array(z.object({
    name: z.string(),
    source: z.string()
  }))
})

type newEquipFormSchema = z.infer<typeof newEquipFormSchema>

export function EquipForm() {
  const { tag } = useParams()

  const equip = equipamentos.find(equipamento => equipamento.tag.id === tag)
  const editMode = Boolean(equip)

  const { 
    handleSubmit,
    register,
    control
  } = useForm<newEquipFormSchema>({
    defaultValues: {
      name: equip?.name,
      tag: {
        unit: "I",
        area: equip?.tag.area,
        equipCode: equip?.tag.equipCode,
        seqNumber: equip?.tag.seqNumber,
      },
      photos: equip?.photos

    }
  })

  const { fields: photos, append, remove } = useFieldArray({
    control,
    name: "photos"
  })

  function createEquip(data: newEquipFormSchema) {
    console.log(data)
  }

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (files) => updateImgSrc(files),
    accept: { 'image/*': ['.png', '.jpeg', '.jpg'] },
  })

  function updateImgSrc(files: File[]) {
    const images: Photo[] = files.map(file => {
      const source = URL.createObjectURL(file)
      const name = file.name
      
      return {source, name}
    })
    
    append(images)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <HeaderAdmin />

      <h1 className="mx-6 text-center font-semibold text-2xl md:text-4xl my-5">
          {editMode ? "Editar equipamento" : "Adicionar novo equipamento"}
      </h1>

      <form 
        className="flex-1 md:mx-56 px-6 mb-10 flex flex-col gap-5"
        onSubmit={handleSubmit(createEquip)}
      >
        <label className="flex flex-col gap-2">
          <span>
            Nome:
          </span>
          <input 
            type="text" 
            className="py-2 px-4 w-full border border-solid border-black/25 rounded focus:outline-blue-500"
            placeholder="Nome"
            {...register("name")}
          />
        </label>

        <div className="flex flex-col gap-2">
          <span>Tag:</span>
          <div className="flex w-full items-center justify-between md:justify-normal md:gap-2">
            <input 
              className="text-black/50 py-2 w-10 text-center border border-solid border-black/25 rounded focus:outline-blue-500"
              type="text"
              disabled
              {...register("tag.unit")}
            />
            <span>-</span>
            <input 
              className="py-2 w-20 text-center border border-solid border-black/25 rounded focus:outline-blue-500"
              type="text" 
              maxLength={4} 
              minLength={4}
              {...register("tag.area")}
            />
            <span>-</span>
            <input 
              className="uppercase py-2 w-14 text-center border border-solid border-black/25 rounded focus:outline-blue-500"
              type="text" 
              maxLength={2} 
              minLength={2}
              {...register("tag.equipCode")}
            />
            <span>-</span>
            <input 
              className="py-2 w-16 border text-center border-solid border-black/25 rounded focus:outline-blue-500"
              type="text" 
              maxLength={3} 
              minLength={3}
              {...register("tag.seqNumber")}
            />
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-2">
          <span>Fotos:</span>
          <div
            className="text-black/50 w-full h-20 flex items-center justify-center gap-2 border-2 border-dashed border-black/25 rounded hover:border-blue-500 transition-colors cursor-pointer"
            {...getRootProps()}
          >
            <input {...getInputProps()}/>
            <PlusCircle size={32} weight="light"/>
            <span>Adicione as fotos aqui</span>
          </div>
          {photos.map((photo, index) => (
            <div key={photo.id} className="flex gap-2 items-center">
              <img src={photo.source} alt="" className="w-10 aspect-square object-cover rounded"/>
              <span className="flex-1 truncate">{photo.name}</span>
              <X
                className="mr-2 cursor-pointer"
                onClick={() => remove(index)}
              />
            </div>
          ))}
        </div>

        <button
          className="py-2 px-6 mx-auto max-w-max text-white text-lg font-medium rounded bg-blue-800 hover:bg-blue-900 transition-colors" 
        >
          Cadastrar equipamento
        </button>
      </form>
    </div>
  )
}
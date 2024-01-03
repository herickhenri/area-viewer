import { useState } from "react";
import { HeaderAdmin } from "../components/HeaderAdmin";
import { Markings } from "../components/Markings";
import { PanoramaArea } from "../components/PanoramaArea";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { useParams } from "react-router-dom";
import { panoramas } from "../data/DataPanorama";

export type Coord = {
  x: number,
  y: number
}

export type Marking = {
  coord: Coord
  equip_tag: string
}

const createPanoramaFormSchema = z.object({
  name: z.string(),
  panorama: z.string(),
  markings: z.array(z.object({
    equip_tag: z.string(),
    coord: z.object({
      x: z.number(),
      y: z.number()
    }),
  }))
})

export type createPanoramaFormData = z.infer<typeof createPanoramaFormSchema>

export function PanoramaForm() {
  const { id } = useParams()

  const panorama = panoramas.find(panoramas => panoramas.id === id)
  const editMode = Boolean(panorama)

  const [coord, setCoord] = useState<Coord | null>(null)

  const newCycleForm = useForm<createPanoramaFormData>({
    defaultValues: {
      name: panorama?.name,
      panorama: panorama?.image,
      markings: panorama?.markings
    }
  })

  const {
    control,
    register,
    handleSubmit,
  } = newCycleForm

  async function createPanorama(data: createPanoramaFormData) {
    const blob = await fetch(data.panorama).then((response) => response.blob())
    console.log(data, blob)
  }

  function changeCoord(coordenada: Coord) {
    setCoord(coordenada)
  }

  
  return (
    <div className="min-h-screen flex flex-col">
      <HeaderAdmin />
      
      <h1 className="text-center font-semibold text-2xl md:text-4xl my-5">
          {editMode ? "Editar panorama" : "Adicionar novo panorama"}
      </h1>

      <FormProvider {...newCycleForm}>
        <form 
          className="flex-1 mb-10 mx-5 md:mx-56 flex flex-col gap-5"
          action=""
          onSubmit={handleSubmit(createPanorama)}
        >
          <label className="flex flex-col gap-2">
            <span>
              Nome do local:
            </span>
            <input 
              className="py-2 px-4 w-full border border-solid border-black/25 rounded focus:outline-blue-500"
              type="text" 
              placeholder="Nome"
              {...register("name")}
            />
          </label>
          <Controller 
            name="panorama"
            control={control}
            render={({ field }) => (
              <PanoramaArea
                panorama={field.value}
                updateImgSrc={field.onChange}
                changeCoord={changeCoord}
              />
            )}
          /> 

          <Markings coord={coord}/>

          <button className="py-1 px-6 mx-auto max-w-max text-white text-2xl font-medium  rounded bg-blue-800 hover:bg-blue-700 transition-colors">
            Adicionar ao mapa
          </button>
        </form>  
      </FormProvider>
    </div>
  )
}
import { Header } from "../components/header";
import { useState } from "react";
import { MarkingInput } from "../components/MarkingInput";
import { equipamentos } from "../data/DataEquip";
import { PanoramaArea } from "../components/PanoramaArea";

export type Coord = {
  x: number,
  y: number
}

export type Marking = {
  coord: Coord
  tag_equip: string,
}

export function AddPanorama() {
  const [coord, setCoord] = useState<Coord | null>(null)
  const [markings, setMarkings] = useState<Marking[]>([])
  const [panorama, setPanorama] = useState<string | null>(null)

  const markings_tags = markings.map(marking => marking.tag_equip)

  const optionsSelect = equipamentos
  .filter((equip) => !markings_tags.includes(equip.tag))
  .map(equip => ({value: equip.tag, label: equip.title}))

  function updateImgSrc(source: string) {
    setPanorama(source)
  }

  function changeCoord(coordenada : Coord) {
    setCoord(coordenada)
  }

  function handleMarking(marking: Marking | undefined, tag_equip: string) {
      if(!coord) {
        return
      }

     if(marking) {
      setMarkings(prevMarkings => {
        const uploadMarkings: Marking[] = prevMarkings.map(mark => 
          mark === marking ? {tag_equip, coord} : mark
        )

        return uploadMarkings
      })
      
      return
    }
    setMarkings(prevMarkings => [...prevMarkings, {coord, tag_equip}])
    setCoord(null)
  }

  function deleteMark(marking?: Marking) {
    if (!marking) {
      setCoord(null)

      return
    }

    setMarkings((prevMarkings) => {
      const uploadMarkings = prevMarkings.filter(prevMarking => 
        prevMarking !== marking
      )       
      return uploadMarkings
    })
  }
  
  return (
    <div>
      <Header />
      
      <h1 className="text-center font-semibold text-2xl md:text-4xl my-5">
          Adicionar novo panorama
      </h1>

      <form 
        className="mb-10 mx-5 md:mx-56 flex flex-col gap-5"
        action=""
      >
        <label className="flex flex-col gap-2">
          <span>
            Nome do local:
          </span>
          <input 
            className="py-2 px-4 w-full border border-solid border-black/25 rounded focus:outline-blue-500"
            type="text" 
            placeholder="Nome"
          />
        </label>

        <PanoramaArea
          panorama={panorama}
          markings={markings}
          coord={coord}
          changeCoord={changeCoord}
          updateImgSrc={updateImgSrc}
        />

        <div className="flex flex-col gap-2">
          <span>Marcações:</span>
          {markings.map((marking, key) =>{
            const equip = equipamentos.find((equip) => equip.tag === marking.tag_equip)
            const defaultValue = equip && {value: equip.tag, label: equip.title}
            return (
              <MarkingInput
              key={key}
              options={optionsSelect}
              handleMarking={handleMarking}
              defaultValue={defaultValue}
              deleteMark={deleteMark}
              marking={marking}
              />        
          )})}
          {coord && (
            <MarkingInput
              options={optionsSelect}
              handleMarking={handleMarking}
              deleteMark={deleteMark}
            />
          )}
          <span className="flex md:mx-auto text-red-500 text-center">
            Clique na imagem para adicionar uma nova marcação.
          </span>
        </div>

        <a href="/mapa-area" className="py-1 px-6 mx-auto max-w-max text-white text-2xl font-medium  rounded bg-blue-800 hover:bg-blue-700 transition-colors">
          Adicionar ao mapa
        </a>
      </form>
    </div>
  )
}
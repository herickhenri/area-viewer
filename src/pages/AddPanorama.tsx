import { Camera, MapPin, PencilSimple, PlusCircle } from "@phosphor-icons/react";
import { Header } from "../components/header";
import { MouseEvent, useState } from "react";
import UploadImage from "../components/UploadImage";
import { MarkingInput } from "../components/MarkingInput";
import { equipamentos } from "../data/DataEquip";

export type Coord = {
  x: number,
  y: number
}

export type Marking = {
  coord: Coord
  tag_equip: string,
}

export function AddPanorama() {
  const [panorama, setPanorama] = useState<string | null>(null)
  const [coord, setCoord] = useState<Coord | null>(null)
  const [markings, setMarkings] = useState<Marking[]>([])

  function updateImgSrc(source: string) {
    setPanorama(source)
  }

  const handleClick = (e: MouseEvent) => {
    // Obtém as coordenadas relativas à imagem
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;

    // Atualiza o estado com as coordenadas do clique
    console.log({x, y})
    setCoord({ x, y });
  };

  const markings_tags = markings.map(marking => marking.tag_equip)

  const optionsSelect = equipamentos
  .filter((equip) => !markings_tags.includes(equip.tag))
  .map(equip => ({value: equip.tag, label: equip.title}))

  function deleteMark(tag_equip: string | undefined) {
    const equip = markings.find(marking => marking.tag_equip === tag_equip)

    if(equip) {
      setMarkings((prevMarkings) => {
        const uploadMarkings = prevMarkings.filter(prevMark => 
          prevMark.tag_equip !== tag_equip
        )
        
        return uploadMarkings
      })

      return
    }

    setCoord(null)
  }
  

  function handleMarking(coord: Coord, tag_equip: string) {
    const equip = markings.find((marking) => marking.tag_equip === tag_equip)
 
    if(equip) {
      setMarkings(prevMarkings => {
        const uploadMarkings = prevMarkings.map(marking => 
          marking.coord === coord ? {tag_equip, coord} : marking
        )

        return uploadMarkings
      })
      
      return
    }
    setMarkings(prevMarkings => [...prevMarkings, {coord, tag_equip}])
    setCoord(null)
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
            className="py-2 px-4 w-full border border-solid border-black/25 rounded-lg focus:outline-blue-500"
            type="text" 
            placeholder="Nome"
          />
        </label>

        <label className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span>Foto panorâmica:</span>
            <UploadImage updateImgSrc={updateImgSrc}>
              <PencilSimple size={32} className="p-1 rounded-full bg-blue-600 text-white cursor-pointer"/>
            </UploadImage>
          </div>
          <div className="h-40 md:h-80 rounded bg-slate-300 overflow-hidden cursor-pointer">
            {panorama ?(
              <div key={panorama} className="relative h-full overflow-x-auto">
                <img
                  onClick={handleClick}
                  className="h-full min-w-min" 
                  src={panorama} 
                  alt="Foto panorâmica" 
                  />
                {markings.map((mark) => (
                  <MapPin
                    key={mark.tag_equip}  
                    className="w-4 h-4 md:w-6 md:h-6 -translate-x-1/2 -translate-y-full text-red-600 absolute"
                    weight="fill"
                    style={{
                      left: mark.coord.x,
                      top: mark.coord.y,
                    }}
                  />
                ))}
                {coord && (
                  <MapPin 
                    className="w-4 h-4 md:w-6 md:h-6 -translate-x-1/2 -translate-y-full text-red-600 absolute"
                    weight="fill"
                    style={{
                      left: coord.x,
                      top: coord.y,
                    }}
                  />
                )}
              </div>
              ) : (
                <UploadImage className="h-full w-full flex justify-center items-center" updateImgSrc={updateImgSrc}>
                  <Camera size={32} className="text-black/50"/>
                </UploadImage>
              )
            }
          </div>
        </label>

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
              coord={marking.coord}
              defaultValue={defaultValue}
              deleteMark={deleteMark}
              tag_equip={marking.tag_equip}
              />        
          )})}
          {coord && (
            <MarkingInput
              options={optionsSelect}
              coord={coord}
              handleMarking={handleMarking}
              deleteMark={deleteMark}
            />
          )}
          <span className="flex md:mx-auto text-blue-500 text-center">
            Clique na imagem para adicionar uma nova marcação.
          </span>
        </div>

        <a href="" className="py-1 px-6 mx-auto max-w-max text-white text-2xl font-medium  rounded bg-blue-800 hover:bg-blue-700 transition-colors">
          Adicionar ao mapa
        </a>
      </form>
    </div>
  )
}
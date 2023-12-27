import { Camera, MapPin } from "@phosphor-icons/react";
import { Header } from "../components/header";
import { MouseEvent, useState } from "react";
import UploadImage from "../components/UploadImage";
import { MarkingInput } from "../components/MarkingInput";

export type Marking = {
  x: number,
  y: number,
  tag_equip?: string,
}

export function AddPanorama() {
  const [panorama, setPanorama] = useState<string | null>(null)
  const [marking, setMarking] = useState<Marking | null>(null)
  const [markings, setMarkings] = useState<Marking[]>([])

  function updateImgSrc(source: string) {
    setPanorama(source)
  }

  const handleClick = (e: MouseEvent) => {
    // Obtenha as coordenadas relativas à imagem
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;

    // Atualize o estado com as coordenadas do clique
    setMarking({ x, y });
  };

  function deleteMark(mark: Marking) {
    if (!mark.tag_equip) {
      setMarking(null)
      return
    }

    setMarkings((prevMarkings) => {
      const uploadMarkings = prevMarkings.filter(prevMark => prevMark.tag_equip !== mark.tag_equip)

      return uploadMarkings
    })
  }

  return (
    <div>
      <Header />
      
      <h1 className="text-center font-semibold text-2xl my-5">
          Adicionar novo panorama
      </h1>

      <form 
        className="mb-10 px-5 flex flex-col gap-5"
        action=""
      >
        <label className="flex flex-col gap-2">
          <span>
            Nome do local:
          </span>
          <input 
            className="py-2 px-4 w-full border border-solid border-black/25 rounded-lg"
            type="text" 
            placeholder="Nome"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span>Foto panorâmica:</span>
          <div className="h-40 rounded bg-slate-300 overflow-hidden">
            {panorama ?(
              <div className="relative h-full overflow-x-auto">
                <img
                  onClick={handleClick}
                  className="h-full min-w-min" 
                  src={panorama} 
                  alt="Foto panorâmica" 
                  />
                {marking && (
                  <MapPin 
                    className="text-red-600 absolute"
                    size={16}
                    weight="fill"
                    style={{
                      left: marking.x -8,
                      top: marking.y - 20,
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

        <label className="flex flex-col gap-2">
          <span>Marcações:</span>
          {markings.map((mark, key) => (
            <MarkingInput 
              key={key}
              mark={mark} 
              deleteMark={deleteMark}
            />
          ))}
          {marking && (
            <MarkingInput 
              mark={marking} 
              deleteMark={deleteMark}
            />
          )}
        </label>
      </form>
    </div>
  )
}
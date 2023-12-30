import { Camera, MapPin, PencilSimple } from "@phosphor-icons/react";
import UploadImage from "./UploadImage";
import { MouseEvent, useEffect, useRef, useState } from "react";
import { Marking } from "../pages/AddPanorama";

type Size = {
  width: number;
  height: number;
}

type Coord = {
  x: number,
  y: number
}

interface PanoramaAreaProps {
  markings: Marking[]
  panorama: string | null
  coord : Coord | null
  changeCoord: (coord: Coord) => void
  updateImgSrc: (source: string) => void
}

export function PanoramaArea({ 
  markings, 
  panorama, 
  coord, 
  changeCoord,
  updateImgSrc }: PanoramaAreaProps) {
  const panoramaRef= useRef<HTMLImageElement>(null)

  const [renderedSize, setRenderedSize] = useState<Size>({} as Size)
  const [intrinsicSize, setIntrinsicSize] = useState<Size>({} as Size)

  const conversionRate = {
    width: intrinsicSize.width / renderedSize.width,
    height: intrinsicSize.height / renderedSize.height
  }

  useEffect(() => {
    if (!panoramaRef.current) {
      return
    }

    //Tamanho original da imagem
    const { naturalWidth, naturalHeight } = panoramaRef.current;
    //tamanho gerado pela página
    const { offsetWidth, offsetHeight } = panoramaRef.current

    setIntrinsicSize({ 
      width: naturalWidth, 
      height: naturalHeight 
    })

    setRenderedSize({ 
      width: offsetWidth, 
      height: offsetHeight 
    })
  }, [panorama])
  console.log(coord)

  const handleClick = (e: MouseEvent) => {
    // Obtém as coordenadas relativas à imagem
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;

    // Atualiza o estado com as coordenadas do clique
    changeCoord({
      x: x * conversionRate.width,
      y: y * conversionRate.height
    });
  };

  return (
    <div className="flex flex-col gap-2">
    <div className="flex items-center justify-between">
      <span>Foto panorâmica:</span>
      <UploadImage updateImgSrc={updateImgSrc}>
        <PencilSimple size={32} className="p-1 rounded-full bg-blue-600 hover:bg-blue-700 transition-colors text-white cursor-pointer"/>
      </UploadImage>
    </div>
    <div className="h-40 md:h-80 rounded bg-slate-300 hover:bg-slate-400 transition-colors overflow-hidden cursor-pointer">
      {panorama ?(
        <div key={panorama} className="relative h-full overflow-x-auto">
          <img
            ref={panoramaRef}
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
                left: mark.coord.x / conversionRate.width,
                top: mark.coord.y / conversionRate.height,
              }}
            />
          ))}
          {coord && (
            <MapPin 
              className="w-4 h-4 md:w-6 md:h-6 -translate-x-1/2 -translate-y-full text-red-600 absolute"
              weight="fill"
              style={{
                left: coord.x / conversionRate.width,
                top: coord.y / conversionRate.height,
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
  </div>
  )
}
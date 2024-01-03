import { Camera, MapPin, PencilSimple } from "@phosphor-icons/react";
import { MouseEvent, useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Coord, createPanoramaFormData } from "../pages/PanoramaForm";
import { useFormContext } from "react-hook-form";

type Size = {
  width: number;
  height: number;
}

interface PanoramaAreaProps {
  panorama: string | null
  updateImgSrc: (source: string) => void
  changeCoord: (coordenada: Coord) => void
}

export function PanoramaArea({ 
  panorama, 
  updateImgSrc,
  changeCoord
}: PanoramaAreaProps) {
  const { watch } = useFormContext<createPanoramaFormData>()
  const markings = watch("markings")
  const panoramaRef= useRef<HTMLImageElement>(null)

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (files) => updateImgSrc(URL.createObjectURL(files[0])),
    accept: { 'image/*': ['.png', '.jpeg', '.jpg'] },
    maxFiles: 1,
  })

  const [renderedSize, setRenderedSize] = useState<Size>({} as Size)
  const [intrinsicSize, setIntrinsicSize] = useState<Size>({} as Size)

  const conversionRate = {
    width: intrinsicSize.width / renderedSize.width,
    height: intrinsicSize.height / renderedSize.height
  }

  function getSizes() {
    if (!panoramaRef.current) {
      return
    }

    //Tamanho original da imagem
    const { naturalWidth, naturalHeight } = panoramaRef.current
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
  }

  useEffect(() => {
    window.addEventListener('resize', getSizes)
  }, [])


  const handleClick = (e: MouseEvent) => {
    // Obtém as coordenadas relativas à imagem
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;

    // Atualiza o estado com as coordenadas do clique
    changeCoord({
      x: Math.round(x * conversionRate.width),
      y: Math.round(y * conversionRate.height)
    });
  };

  return (
    <div className="flex flex-col gap-2">
    <div className="flex items-center justify-between">
      <span>Foto panorâmica:</span>
      <div {...getRootProps()}>
        <input {...getInputProps()}/>
        <PencilSimple size={32} className="p-1 rounded-full bg-blue-600 hover:bg-blue-700 transition-colors text-white cursor-pointer"/>
      </div>
    </div>
    <div className="h-40 md:h-80 rounded bg-slate-300 hover:bg-slate-400 transition-colors overflow-hidden cursor-pointer">
      {panorama ?(
        <div key={panorama} className="relative h-full overflow-x-auto">
          <img
            ref={panoramaRef}
            onClick={handleClick}
            onLoad={getSizes}
            className="h-full min-w-min" 
            src={panorama}
            alt="Foto panorâmica" 
            />
          {markings.map((mark) => (
            <MapPin
              key={mark.equip_tag}  
              className="w-4 h-4 md:w-6 md:h-6 -translate-x-1/2 -translate-y-full text-red-600 absolute"
              weight="fill"
              style={{
                left: mark.coord.x / conversionRate.width,
                top: mark.coord.y / conversionRate.height,
              }}
            />
          ))}
        </div>
        ) : (
          <div 
            className="h-full w-full flex justify-center items-center"
            {...getRootProps()}
            >
            <input {...getInputProps()}/>
            <Camera size={32} className="text-black/50"/>
          </div>
        )
      }
    </div>
  </div>
  )
}
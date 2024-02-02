import { MapPin } from '@phosphor-icons/react'
import { MouseEvent, useEffect, useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { Coord, createPanoramaFormData } from '.'

type Size = {
  width: number
  height: number
}

interface PanoramaAreaProps {
  changeCoord: (coordenada: Coord) => void
  coord: Coord | null
  source: string
}

export function PanoramaArea({
  changeCoord,
  coord,
  source,
}: PanoramaAreaProps) {
  const { watch } = useFormContext<createPanoramaFormData>()
  const markings = watch('markings')
  const panoramaRef = useRef<HTMLImageElement>(null)

  const [renderedSize, setRenderedSize] = useState<Size>({} as Size)
  const [intrinsicSize, setIntrinsicSize] = useState<Size>({} as Size)

  const conversionRate = {
    width: intrinsicSize.width / renderedSize.width,
    height: intrinsicSize.height / renderedSize.height,
  }

  function getSizes() {
    if (!panoramaRef.current) {
      return
    }

    // Tamanho original da imagem
    const { naturalWidth, naturalHeight } = panoramaRef.current
    // tamanho gerado pela página
    const { offsetWidth, offsetHeight } = panoramaRef.current

    setIntrinsicSize({
      width: naturalWidth,
      height: naturalHeight,
    })

    setRenderedSize({
      width: offsetWidth,
      height: offsetHeight,
    })
  }

  useEffect(() => {
    window.addEventListener('resize', getSizes)

    return () => {
      window.removeEventListener('resize', getSizes)
    }
  }, [])

  const handleClick = (e: MouseEvent) => {
    // Obtém as coordenadas relativas à imagem
    const x = e.nativeEvent.offsetX
    const y = e.nativeEvent.offsetY

    // Atualiza o estado com as coordenadas do clique
    changeCoord({
      coord_x: Math.round(x * conversionRate.width),
      coord_y: Math.round(y * conversionRate.height),
    })
  }

  const points = markings
    ? markings.map((marking) => ({
        coord_x: marking.coord_x,
        coord_y: marking.coord_y,
      }))
    : []

  coord && points?.push(coord)

  return (
    <div className="relative h-full overflow-x-auto">
      <img
        ref={panoramaRef}
        onClick={handleClick}
        onLoad={getSizes}
        className="h-full min-w-min"
        src={source}
        alt="Foto panorâmica"
      />
      {points.map((point, index) => (
        <MapPin
          key={index}
          className="absolute h-4 w-4 -translate-x-1/2 -translate-y-full text-red-600 md:h-6 md:w-6"
          weight="fill"
          style={{
            left: point.coord_x / conversionRate.width,
            top: point.coord_y / conversionRate.height,
          }}
        />
      ))}
    </div>
  )
}

import { MapPin } from '@phosphor-icons/react'
import React, {
  MouseEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'

type Size = {
  width: number
  height: number
}

type Coord = {
  x: number
  y: number
}

interface PanoramaAreaProps {
  changeCoord: (coordenada: Coord) => void
  coord: Coord | null
  points: Coord[]
  source: string
  children: React.ReactNode
}

export function MarkupFor2dPanorama({
  changeCoord,
  coord,
  points,
  source,
}: PanoramaAreaProps) {
  const panoramaRef = useRef<HTMLImageElement>(null)

  const [renderedSize, setRenderedSize] = useState<Size>({} as Size)
  const [intrinsicSize, setIntrinsicSize] = useState<Size>({} as Size)

  const conversionRate = {
    width: intrinsicSize.width / renderedSize.width,
    height: intrinsicSize.height / renderedSize.height,
  }

  const getSizes = useCallback(() => {
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
  }, [])

  useEffect(() => {
    window.addEventListener('resize', getSizes)

    return () => {
      window.removeEventListener('resize', getSizes)
    }
  }, [getSizes])

  function handleClick(e: MouseEvent) {
    // Obtém as coordenadas relativas à imagem
    const x = e.nativeEvent.offsetX
    const y = e.nativeEvent.offsetY

    // Atualiza o estado com as coordenadas do clique
    changeCoord({
      x: Math.round(x * conversionRate.width),
      y: Math.round(y * conversionRate.height),
    })
  }

  // coord && points?.push(coord)

  return (
    <div className="relative">
      <TransformWrapper maxScale={10}>
        <TransformComponent
          contentClass="relative"
          contentProps={{ onClick: handleClick }}
        >
          <img
            ref={panoramaRef}
            onClick={handleClick}
            onLoad={getSizes}
            src={source}
            alt="Foto panorâmica"
          />
          {coord && (
            <MapPin
              className="absolute h-2 w-2 -translate-x-1/2 -translate-y-full fill-red-600"
              weight="fill"
              style={{
                left: coord.x / conversionRate.width,
                top: coord.y / conversionRate.height,
              }}
            />
          )}
          {points.map((point, index) => (
            <MapPin
              key={index}
              className="absolute h-2 w-2 -translate-x-1/2 -translate-y-full fill-slate-300"
              weight="fill"
              style={{
                left: point.x / conversionRate.width,
                top: point.y / conversionRate.height,
              }}
            />
          ))}
        </TransformComponent>
      </TransformWrapper>
    </div>
  )
}

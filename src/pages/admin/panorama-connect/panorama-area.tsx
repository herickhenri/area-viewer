import { MouseEvent, useEffect, useRef, useState } from 'react'
import { Arrow } from './Arrow'
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch'
import { RemoveConnection } from './remove-connection'

type Size = {
  width: number
  height: number
}

type Coordinates = {
  x: number
  y: number
}

type Point = {
  coord_x: number
  coord_y: number
  name: string
  panorama_id: string
  panorama_connect_id: string
}

interface PanoramaAreaProps {
  source: string
  value: Coordinates
  points?: Point[]
  onChange: (coordinates: Coordinates) => void
}

export function PanoramaArea({
  source,
  value,
  points,
  onChange,
}: PanoramaAreaProps) {
  const panoramaRef = useRef<HTMLImageElement>(null)

  const [renderedSize, setRenderedSize] = useState<Size>({} as Size)
  const [intrinsicSize, setIntrinsicSize] = useState<Size>({} as Size)
  const [scale, setScale] = useState(1)

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
    const target = e.target as HTMLElement

    if (target.id !== 'click-area') {
      return
    }

    // Obtém as coordenadas relativas à imagem
    const x = e.nativeEvent.offsetX
    const y = e.nativeEvent.offsetY

    // Atualiza o estado com as coordenadas do clique
    onChange({
      x: Math.round(x * conversionRate.width),
      y: Math.round(y * conversionRate.height),
    })
  }

  return (
    <div className="relative rounded">
      <TransformWrapper maxScale={10} onZoom={(e) => setScale(e.state.scale)}>
        <TransformComponent
          contentClass="relative"
          contentProps={{ onClick: handleClick, id: 'click-area' }}
        >
          <img
            ref={panoramaRef}
            onClick={handleClick}
            onLoad={getSizes}
            className="select-none"
            src={source}
            alt="Foto panorâmica"
          />
          {points &&
            points.map((point) => (
              <div
                key={point.coord_x + point.coord_y}
                className="absolute origin-top-left"
                style={{
                  left: point.coord_x / conversionRate.width,
                  top: point.coord_y / conversionRate.height,
                  transform: `scale(${1 / scale}) translate(-50%,-50%)`,
                }}
              >
                <RemoveConnection
                  icon={Arrow}
                  name={point.name}
                  connection={{
                    panorama_id: point.panorama_id,
                    panorama_connect_id: point.panorama_connect_id,
                  }}
                />
              </div>
            ))}
          {value && (
            <div
              className="absolute origin-top-left"
              style={{
                left: value.x / conversionRate.width,
                top: value.y / conversionRate.height,
                transform: `scale(${1 / scale}) translate(-50%,-50%)`,
              }}
            >
              <Arrow className="h-4 w-4 fill-red-500 md:h-12 md:w-12" />
            </div>
          )}
        </TransformComponent>
      </TransformWrapper>
    </div>
  )
}

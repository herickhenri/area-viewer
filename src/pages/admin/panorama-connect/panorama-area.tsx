import * as Tooltip from '@radix-ui/react-tooltip'
import { MouseEvent, useEffect, useRef, useState } from 'react'
import { Arrow } from './Arrow'

type Size = {
  width: number
  height: number
}

export type Coord = {
  coord_x: number
  coord_y: number
}

type Point = Coord & {
  name: string
}

interface PanoramaAreaProps {
  source: string
  value: Coord | null
  points?: Point[]
  onChange: (coord: Coord | null) => void
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
    onChange({
      coord_x: Math.round(x * conversionRate.width),
      coord_y: Math.round(y * conversionRate.height),
    })
  }

  return (
    <div className="relative h-40 overflow-x-auto overflow-y-hidden rounded md:h-80">
      <img
        ref={panoramaRef}
        onClick={handleClick}
        onLoad={getSizes}
        className="h-full min-w-min cursor-pointer select-none"
        src={source}
        alt="Foto panorâmica"
      />
      {points &&
        points.map((point) => (
          <div
            key={point.coord_x + point.coord_y}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{
              left: point.coord_x / conversionRate.width,
              top: point.coord_y / conversionRate.height,
            }}
          >
            <Tooltip.Provider delayDuration={100}>
              <Tooltip.Root>
                <Tooltip.Trigger>
                  <Arrow className=" h-6 w-6 fill-white md:h-12 md:w-12" />
                </Tooltip.Trigger>
                <Tooltip.Portal>
                  <Tooltip.Content>
                    <span className="translate-x-1/2 rounded-sm bg-black/80 p-1 text-center text-white">
                      {point.name}
                    </span>
                    <Tooltip.Arrow />
                  </Tooltip.Content>
                </Tooltip.Portal>
              </Tooltip.Root>
            </Tooltip.Provider>
          </div>
        ))}
      {value && (
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{
            left: value.coord_x / conversionRate.width,
            top: value.coord_y / conversionRate.height,
          }}
        >
          <Arrow className=" h-6 w-6 fill-red-500 md:h-12 md:w-12" />
        </div>
      )}
    </div>
  )
}

import { WarningCircle } from '@phosphor-icons/react'
import { MouseEvent, useCallback, useEffect, useRef, useState } from 'react'
import { Coord } from '.'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'

type Size = {
  width: number
  height: number
}

interface PanoramaAreaProps {
  changeCoord: (coordinates: Coord) => void
  coord: Coord | null
  source: string
}

export function PanoramaArea({
  changeCoord,
  coord,
  source,
}: PanoramaAreaProps) {
  const panoramaRef = useRef<HTMLImageElement>(null)

  const [renderedSize, setRenderedSize] = useState<Size>({} as Size)
  const [intrinsicSize, setIntrinsicSize] = useState<Size>({} as Size)
  const [scale, setScale] = useState(1)

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
    const target = e.target as HTMLElement

    if (target.id !== 'click-area') {
      return
    }

    const x = e.nativeEvent.offsetX
    const y = e.nativeEvent.offsetY

    changeCoord({
      coord_x: Math.round(x * conversionRate.width),
      coord_y: Math.round(y * conversionRate.height),
    })
  }

  return (
    <div className="relative overflow-x-auto">
      <TransformWrapper maxScale={10} onZoom={(e) => setScale(e.state.scale)}>
        <TransformComponent
          contentClass="relative"
          contentProps={{ onClick: handleClick, id: 'click-area' }}
        >
          <img
            ref={panoramaRef}
            onLoad={getSizes}
            src={source}
            alt="Foto panorâmica"
          />
          {coord && (
            <WarningCircle
              className="absolute h-6 w-6 origin-top-left fill-yellow-500"
              weight="fill"
              style={{
                left: coord.coord_x / conversionRate.width,
                top: coord.coord_y / conversionRate.height,
                transform: `scale(${1 / scale}) translate(-50%,-50%)`,
              }}
            />
          )}
        </TransformComponent>
      </TransformWrapper>
    </div>
  )
}

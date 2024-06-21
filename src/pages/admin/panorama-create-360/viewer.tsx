import { Viewer } from '@photo-sphere-viewer/core'
import { Marker, MarkersPlugin } from '@photo-sphere-viewer/markers-plugin'
import { useEffect, useRef, useState } from 'react'
import Draggable from 'react-draggable'

import '@photo-sphere-viewer/markers-plugin/index.css'
import '@photo-sphere-viewer/core/index.css'
import { Button } from '@/components/button'
import { useQuery } from '@tanstack/react-query'
import { getEquipments } from '@/api/get-equipments'
import { SelectInput } from './select-input'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

interface Viewer360Props {
  panorama: string
}

type Option = 'newMarked' | 'connection' | null

type Item = {
  value: string
  label: string
}

const panoramaFormSchema = z.object({
  name: z.string(),
  markings: z.array(
    z.object({
      width: z.number(),
      heigth: z.number(),
      equipment_id: z.string(),
    }),
  ),
  file: z.instanceof(File).optional(),
})

type panoramaFormSchema = z.infer<typeof panoramaFormSchema>

export function Viewer360({ panorama }: Viewer360Props) {
  const { data: equipments } = useQuery({
    queryKey: ['equipments'],
    queryFn: getEquipments,
  })

  const [option, setOption] = useState<Option>(null)
  const [markersPlugin, setMarkersPlugin] = useState<MarkersPlugin>()
  const [markers, setMarkers] = useState<Marker[]>()
  const [position, setPosition] = useState<{
    width: number
    height: number
  } | null>(null)

  const { control } = useForm<panoramaFormSchema>({
    resolver: zodResolver(panoramaFormSchema),
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'markings',
  })

  const sphereElementRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!sphereElementRef.current) {
      return
    }

    const spherePlayerInstance = new Viewer({
      container: sphereElementRef.current,
      panorama,
      defaultYaw: '130deg',
      sphereCorrection: {},
      plugins: [MarkersPlugin],
    })

    setMarkersPlugin(
      spherePlayerInstance.getPlugin<MarkersPlugin>(MarkersPlugin),
    )

    spherePlayerInstance.addEventListener('click', ({ data }) => {
      if (data.rightclick) {
        return
      }
      setPosition({ width: data.yaw, height: data.pitch })
    })

    return () => {
      spherePlayerInstance.destroy()
    }
  }, [sphereElementRef, panorama])

  // useEffect(() => {
  //   if (!markersPlugin || !position) {
  //     return
  //   }

  //   markersPlugin.addMarker({
  //     id: `#${Math.random()}`,
  //     position: { yaw: position?.width, pitch: position?.height },
  //     image: '/pin-red.svg',
  //     size: { width: 32, height: 32 },
  //     anchor: 'bottom center',
  //     tooltip: 'Selecione um equipamento no campo das marcações',
  //     data: {
  //       generated: true,
  //     },
  //   })

  //   setMarkers(markersPlugin.getMarkers())
  // }, [markersPlugin, position])

  // if (!equipments) {
  //   return
  // }
  // const items: Item[] = equipments.map((equipment) => ({
  //   value: equipment.id,
  //   label: equipment.name,
  // }))

  function addMarking(item: Item | null) {
    if (item && position) {
      append({
        equipment_id: item.value,
        width: position.width,
        heigth: position.height,
      })
    }

    setPosition(null)
  }

  return (
    <div>
      <div className="absolute h-[calc(100vh-4rem)] w-full">
        <Draggable defaultClassName="z-[100] absolute" bounds="parent">
          <div className="flex w-72 flex-col items-center gap-4 rounded-lg bg-slate-100 p-4 shadow-lg">
            <h2 className="text-center text-xl font-semibold">Opções</h2>
            <Button
              onClick={() => setOption('newMarked')}
              disabled={option === 'newMarked'}
            >
              Marcar um equipamento
            </Button>
            <Button
              className="w-full"
              onClick={() => setOption('connection')}
              disabled={option === 'connection'}
            >
              Conectar panorama
            </Button>
            <span>Marcações</span>
          </div>
        </Draggable>
      </div>
      <div className="h-[calc(100vh-4rem)]" ref={sphereElementRef} />
    </div>
  )
}

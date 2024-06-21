import { UploadImage } from '@/components/upload-image'
import { Camera } from '@phosphor-icons/react'

interface SelectImageProps {
  updatePanoramaFile: (file: File) => void
}

export function SelectImage({ updatePanoramaFile }: SelectImageProps) {
  return (
    <div>
      <h1 className="mx-6 my-5 text-center text-2xl font-semibold md:text-4xl">
        Conectar panoramas
      </h1>
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-xl">Selecione a imagem em 360°</h2>
        <UploadImage updatePanoramaFile={updatePanoramaFile}>
          <div className="group flex h-40 w-80 cursor-pointer items-center justify-center rounded border-2 border-dashed border-blue-400 transition-colors hover:border-blue-500">
            <Camera
              size={32}
              className="text-slate-300 transition-colors group-hover:text-slate-400"
            />
          </div>
        </UploadImage>
      </div>
    </div>
  )
}

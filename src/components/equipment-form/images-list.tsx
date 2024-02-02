import { useFormContext } from 'react-hook-form'
import { ImagesViewer } from './images-viewer'
import { CreateEquipmentFormSchema } from '.'

export function ImagesList() {
  const { getValues } = useFormContext<CreateEquipmentFormSchema>()
  const { files, images } = getValues()

  return (
    <div>
      {files.map(({ file }, index) => {
        const source = URL.createObjectURL(file)
        return (
          <div key={index} className="flex w-60 items-center gap-2">
            <img
              src={source}
              alt=""
              className="aspect-square w-10 rounded object-cover"
            />
            <span
              className="flex-1 cursor-pointer hover:text-blue-500 hover:underline"
              onClick={() => setOnImageViewer(true)}
            >
              Ver imagem
            </span>
            <span className="text-sm text-green-500">nova</span>
            <X
              className="mr-1 cursor-pointer"
              onClick={() => removeFile(index)}
            />
          </div>
        )
      })}
      {images?.map((image, index) => (
        <div key={image.key} className="flex w-60 items-center gap-2">
          <img
            src={image.link}
            alt=""
            data-remove={image.isRemove}
            className="aspect-square w-10 rounded object-cover data-[remove=true]:grayscale"
          />
          <span
            className="flex-1 cursor-pointer hover:text-blue-500 hover:underline"
            onClick={() => setOnImageViewer(true)}
          >
            Ver imagem
          </span>
          {image.isRemove ? (
            <ArrowCounterClockwise
              className="mr-1 cursor-pointer"
              onClick={() => updateImage(index, { ...image, isRemove: false })}
            />
          ) : (
            <X
              className="mr-2 cursor-pointer"
              onClick={() => removeImage(index)}
            />
          )}
        </div>
      ))}

      <ImagesViewer
        sources={allImages}
        onImageViewer={onImageViewer}
        changeOnImageViewer={setOnImageViewer}
      />
    </div>
  )
}

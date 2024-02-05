import { useDropzone } from 'react-dropzone'
import { ArrowCounterClockwise, PlusCircle, X } from '@phosphor-icons/react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { CreateEquipmentFormSchema } from '.'

export function UploadFiles() {
  const { control } = useFormContext<CreateEquipmentFormSchema>()

  const {
    fields: files,
    remove: removeFile,
    append: appendFile,
  } = useFieldArray({
    control,
    name: 'files',
  })
  const { fields: images, update: updateImage } = useFieldArray({
    control,
    name: 'images',
  })

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleFile,
    accept: { 'image/*': ['.png', '.jpeg', '.jpg'] },
  })

  function handleFile(files: File[]) {
    files.forEach((file) => {
      appendFile({ file })
    })
  }

  function removeImage(index: number) {
    const image = images[index]
    updateImage(index, { ...image, isRemove: true })
  }

  return (
    <div className="flex flex-1 flex-col gap-2">
      <span>Fotos:</span>

      <div
        className="flex h-20 w-full cursor-pointer items-center justify-center gap-2 rounded border-2 border-dashed border-black/25 text-black/50 transition-colors hover:border-blue-500 focus:border-blue-500 focus:outline-none"
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <PlusCircle size={32} weight="light" />
        <span>Adicione as fotos aqui</span>
      </div>

      {files.map(({ file }, index) => {
        const source = URL.createObjectURL(file)
        return (
          <div key={index} className="flex w-60 items-center gap-2">
            <img
              src={source}
              alt=""
              className="aspect-square w-10 rounded object-cover"
            />
            <span className="flex-1">Imagem</span>
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
          <span className="flex-1">Imagem</span>
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
    </div>
  )
}

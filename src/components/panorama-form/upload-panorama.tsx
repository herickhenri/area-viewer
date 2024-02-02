import { ReactNode } from 'react'
import { useDropzone } from 'react-dropzone'

interface uploadPanoramaProps {
  updatePanoramaFile: (file: File) => void
  children: ReactNode
  className?: string
}

export function UploadPanorama({
  updatePanoramaFile,
  children,
  className,
}: uploadPanoramaProps) {
  const { getInputProps, getRootProps } = useDropzone({
    onDrop: (files) => updatePanoramaFile(files[0]),
    accept: { 'image/*': ['.png', '.jpeg', '.jpg'] },
    maxFiles: 1,
  })

  return (
    <div {...getRootProps()} className={className}>
      <input {...getInputProps()} />
      {children}
    </div>
  )
}

import { ReactNode } from 'react'
import { useDropzone } from 'react-dropzone'


interface UploadImageProps {
  updateImgSrc: (source: string) => void
  children: ReactNode
  className?: string
}

export function UploadImage({
  updateImgSrc,
  children,
  className,
}: UploadImageProps) {
  const { getRootProps } = useDropzone({
    onDrop: (files) => updateImgSrc(URL.createObjectURL(files[0])),
    accept: { 'image/*': ['.png', '.jpeg', '.jpg'] },
    maxFiles: 1,
  })

  return <div className={className} {...getRootProps()}>{children}</div>
}

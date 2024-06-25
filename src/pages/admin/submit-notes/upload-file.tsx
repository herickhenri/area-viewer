import { ReactNode } from 'react'
import { useDropzone } from 'react-dropzone'

interface uploadFileProps {
  updateFile: (newFile: File) => void
  children: ReactNode
  className?: string
}

export function UploadFile({
  updateFile,
  children,
  className,
}: uploadFileProps) {
  const { getInputProps, getRootProps } = useDropzone({
    onDrop: (files) => updateFile(files[0]),
    maxFiles: 1,
  })

  return (
    <div {...getRootProps()} className={className}>
      <input {...getInputProps()} />
      {children}
    </div>
  )
}

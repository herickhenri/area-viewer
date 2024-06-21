import { UploadImage } from '@/components/upload-image'
import { Camera } from '@phosphor-icons/react'
import { useState } from 'react'
import { Viewer360 } from './viewer'
import { SelectImage } from './select-image'

export function PanoramaCreate360() {
  const [panoramaUrl, setPanoramaUrl] = useState<string | null>(null)

  function updatePanoramaFile(file: File) {
    const url = URL.createObjectURL(file)

    setPanoramaUrl(url)
  }

  return (
    <div>
      {panoramaUrl ? (
        <Viewer360 panorama={panoramaUrl} />
      ) : (
        <SelectImage updatePanoramaFile={updatePanoramaFile} />
      )}
    </div>
  )
}

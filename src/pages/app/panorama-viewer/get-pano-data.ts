import { PanoData } from '@photo-sphere-viewer/core'
import { ImageSize } from '.'

export function getPanoData(imageSize: ImageSize) {
  const fullWidth = imageSize.width
  const fullHeight = imageSize.width / 2
  const croppedWidth = imageSize.width
  const croppedHeight = imageSize.height
  const croppedX = 0
  const croppedY = fullHeight / 2 - imageSize.height / 2

  const panoData: PanoData = {
    isEquirectangular: true,
    fullWidth,
    fullHeight,
    croppedWidth,
    croppedHeight,
    croppedX,
    croppedY,
  }

  return panoData
}

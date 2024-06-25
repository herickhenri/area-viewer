import { Panorama } from '@/types/Panorama'

interface searchPanoramasFilterProps {
  panoramas: Panorama[]
  search: string
}

export function searchPanoramasFilter({
  panoramas,
  search,
}: searchPanoramasFilterProps) {
  const filteredPanorama =
    search.length > 0
      ? panoramas.filter(({ name }) => {
          const nameUpper = name.toUpperCase().trim()
          const searchUpper = search.toUpperCase().trim()

          return nameUpper.includes(searchUpper)
        })
      : []

  return filteredPanorama
}

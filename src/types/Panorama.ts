export type Panorama = {
  id: string,
  name: string,
  image: string,
  markings: {
    equip_tag: string,
    coord: {
      x: number,
      y: number,
    },
  }[]
  links: {
    id: string
  }[],
  gps: number[]
}
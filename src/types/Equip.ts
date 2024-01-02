import { Tag } from "./Tag";

export type Equip = {
  tag: Tag,
  image: string,
  name: string,
  loc: string,
  fontes_energ?: string[],
  param: {
    vazao: number,
    vel_nom: number,
    cabecote: number,
    potencia: number,
  },
}

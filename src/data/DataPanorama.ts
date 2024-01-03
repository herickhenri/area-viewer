import AreaDregs from '../assets/panoramas/area_dregs.jpeg'
import PisoPdsFundo from '../assets/panoramas/piso_PDs_fundo_panorama.jpeg'
import PisoPds from '../assets/panoramas/piso_PDs_panorama.jpeg'
import { Panorama } from '../types/Panorama'



export const panoramas: Panorama[] = [
  {
    id: "1",
    name: "Piso dos Pd's",
    image: PisoPds,
    markings: [
      {
        equip_tag: "I1502MX215",
        coord: {
          x: 113,
          y: 502,
        }
      },
      {
        equip_tag: "I1502BB220",
        coord: {
          x: 113,
          y: 502,
        }
      },
      {
        equip_tag: "I1502BB218",
        coord: {
          x: 113,
          y: 502,
        }
      },
    ],
    links: [
      {
        id: "3",
      }
    ],
    gps: [100, 50],
  },
  {
    id: "2",
    name: "Fundo do piso dos Pd's",
    image: PisoPdsFundo,
    markings: [
      {
        equip_tag: "I1502BB218",
        coord: {
          x: 113,
          y: 502,
        }
      },
    ],
    links: [
      {
        id: "3",
      }
    ],
    gps: [100, 50],
  },
  {
    id: "3",
    name: "Fundo do piso dos Pd's",
    image: AreaDregs,
    markings: [],
    links: [
      {
        id: "3",
      }
    ],
    gps: [100, 50],
  },
]

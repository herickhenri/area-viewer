import bombaLama from '../assets/equipamentos/i1501bb101.jpeg'
import bombaCondensado from '../assets/equipamentos/i1502bb220.jpeg'
import bombaDregs from '../assets/equipamentos/i1502bb218.jpeg'
import misturadorPoco from '../assets/equipamentos/i1502mx215.jpeg'
import { Equip } from '../types/Equip'

export const equipamentos: Equip[] = [
  { 
    tag: {
      id: "I1501BB101",
      unit: "I",
      area: "1501",
      equipCode: "BB",
      seqNumber: "101",
    },
    image: bombaLama,
    name: "Bomba de lama para o LMCD 1",
    loc: "em frente ao tranque de lama de cal, ao lado das bombas de vacuo dos LMCDs.",
    fontes_energ: [
      "Condensado",
      "Lama de cal"
    ],
    param: {
      vazao: 240,
      vel_nom: 1800,
      cabecote: 65,
      potencia: 110
    }
  },
  {
    tag: {
      id: "I1502BB218",
      unit: "I",
      area: "1502",
      equipCode: "BB",
      seqNumber: "218",
    },
    image: bombaDregs,
    name: "Bomba do fundo do spill",
    loc: "em ao spill, ao lado do piso dos PD's",
    fontes_energ: [
      "Condensado",
      "Dregs"
    ],
    param: {
      vazao: 240,
      vel_nom: 1800,
      cabecote: 65,
      potencia: 110
    }
  },
  {
    tag: {
      id: "I1502BB220",
      unit: "I",
      area: "1502",
      equipCode: "BB",
      seqNumber: "220",
    },
    image: bombaCondensado,
    name: "Bomba de condensado de alta",
    loc: "em frente ao tanque de condensado",
    fontes_energ: [
      "Condensado"
    ],
    param: {
      vazao: 240,
      vel_nom: 1800,
      cabecote: 65,
      potencia: 110
    }
  },
  {
    tag: {
      id: "I1502MX215",
      unit: "I",
      area: "1501",
      equipCode: "MX",
      seqNumber: "215",
    },
    image: misturadorPoco,
    name: "Misturador do poço de agua de selagem",
    loc: "em cima do poço de agua de selagem, ao lado do piso dos PD's",
    param: {
      vazao: 240,
      vel_nom: 1800,
      cabecote: 65,
      potencia: 110
    }
  },
]
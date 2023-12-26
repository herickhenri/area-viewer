import bombaLama from '../assets/equipamentos/i1501bb101.jpeg'
import bombaCondensado from '../assets/equipamentos/i1502bb220.jpeg'
import bombaDregs from '../assets/equipamentos/i1502bb218.jpeg'
import misturadorPoco from '../assets/equipamentos/i1502mx215.jpeg'

export const equipamentos = [
  { 
    tag: "I1501BB101",
    image: bombaLama,
    title: "Bomba de lama para o LMCD 1",
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
    tag: "I1502BB218",
    image: bombaDregs,
    title: "Bomba do fundo do spill",
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
    tag: "I1502BB220",
    image: bombaCondensado,
    title: "Bomba de condensado de alta",
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
    tag: "I1502MX215",
    image: misturadorPoco,
    title: "Misturador do poço de agua de selagem",
    loc: "em cima do poço de agua de selagem, ao lado do piso dos PD's",
    param: {
      vazao: 240,
      vel_nom: 1800,
      cabecote: 65,
      potencia: 110
    }
  }
]
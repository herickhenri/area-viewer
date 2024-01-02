import { Link } from "react-router-dom"
import { equipamentos } from "../data/DataEquip"

interface CardEquipamentoProps {
  tag: string
  image: string
}

export function CardEquipamento({ tag, image }: CardEquipamentoProps) {
  const equip = equipamentos.find((equip) => equip.tag.id === tag)

  if(!equip) {
    return <h1>Equipamento não encontrado</h1>
  }
  const tagString = `
    ${equip.tag.unit}-${equip.tag.area}-${equip.tag.equipCode}-${equip.tag.seqNumber}
  `

  return (
    <div className='flex flex-col w-full md:w-60 shadow-xl shadow-black/40'>
      <img
        className='w-full aspect-square object-cover'
        src={image} 
        alt="bomba de dregs"
      />
      <div className='flex flex-col px-4 mb-4 flex-1'>
        <span className='text-xs'>{tagString}</span>
        <h2 className='text-lg font-semibold flex-1'>{equip.name}</h2>
        <Link
          className='block mt-2 w-full font-semibold text-center py-3 px-4 text-white rounded bg-green-700 hover:bg-green-800 transition-colors'
          to={`/equipamento/${equip.tag.id}`}
        >
          Mais informações
        </Link>
      </div>
    </div>
  )
}
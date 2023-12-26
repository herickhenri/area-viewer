import { equipamentos } from "../data/DataEquip"

interface CardEquipamentoProps {
  tag: string
  image: string
}

export function CardEquipamento({ tag, image }: CardEquipamentoProps) {
  const equip = equipamentos.find((equip) => equip.tag == tag)

  if(!equip) {
    return <h1>Equipamento não encontrado</h1>
  }

  return (
    <div className='flex flex-col w-64 p-2 bg-slate-900 rounded-lg shadow-xl'>
    <img 
      className='h-64 w-full object-cover'
      src={image} 
      alt="bomba de lama" 
    />

    <span className='text-xs mt-1'>tag: {equip.tag}</span>
    <h2 className='flex-1 my-2 text-xl font-semibold'>{equip.title}</h2>
    <a 
      className='block py-2 text-lg font-semibold rounded-lg text-center bg-green-800 hover:bg-green-700 transition-colors'
      href={`equipamento/${tag}`}
    >
      Mais Informações
      </a>
  </div>
  )
}
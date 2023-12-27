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
    <div className='w-full shadow-xl shadow-black/40'>
    <img
      className='w-full aspect-square object-cover'
      src={image} 
      alt="bomba de dregs"
    />
    <div className='px-4 mb-4'>
      <span className='text-xs'>I-1502-BB-218</span>
      <h2 className='text-lg font-semibold'>Bomba de dregs do fundo do spill</h2>
      <a
        className='block mt-2 w-full font-semibold text-center py-3 px-4 text-white bg-green-700 rounded'
        href="/equipamento/I1502BB218"
      >
        Mais informações
      </a>
    </div>
  </div>
  )
}
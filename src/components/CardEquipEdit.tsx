import * as Dialog from '@radix-ui/react-dialog';

import { Link } from "react-router-dom"
import { equipamentos } from "../data/DataEquip"

interface CardEquipamentoProps {
  tag: string
  image: string
}

export function CardEquipEdit({ tag, image }: CardEquipamentoProps) {
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
        <div className="mt-2 flex gap-2 text-white font-semibold text-center">
          <Link
            className='flex items-center justify-center py-2 flex-1 rounded bg-green-700 hover:bg-green-800 transition-colors'
            to={`${equip.tag.id}`}
          >
            Editar
          </Link>
          <Dialog.Root>
            <Dialog.Trigger asChild>
            <button className="py-2 flex-1 text-red-500 border-2 border-solid border-red-500 rounded hover:bg-red-500 hover:text-white transition-colors">
              Excluir
            </button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className='fixed inset-0 h-screen w-screen bg-black/50'/>
              <Dialog.Content className='max-w-96 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-6 bg-white flex flex-col gap-4 rounded-lg'>
                <span className='text-center font-semibold text-xl'>Tem certeza de que deseja excluir o equipamento?</span>
                <div className='flex gap-4 font-semibold'>
                  <Dialog.Close className='text-white flex items-center justify-center py-2 flex-1 rounded bg-blue-600 hover:bg-blue-700 transition-colors'>
                    Cancelar
                  </Dialog.Close>
                  <button className="py-2 flex-1 text-red-500 border-2 border-solid border-red-500 rounded hover:bg-red-500 hover:text-white transition-colors">
                    Excluir
                  </button>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>

        </div>
      </div>
    </div>
  )
}
import { MagnifyingGlass } from '@phosphor-icons/react'
import logoSuzano from '../assets/logo_suzano.png'

import { CardEquipamento } from '../components/CardEquipamento'
import { equipamentos } from '../data/DataEquip'

export function App() {
  return (
    <div>
      <header className='py-2 bg-white flex flex-col items-center gap-2 shadow-xl'>
        <a href="/" className='h-8'>
          <img className='h-full' src={logoSuzano} alt="Logo da suzano"/>
        </a>
        <div className='px-4 py-2 border border-black/25 border-solid rounded-full flex items-center gap-2 focus-within:outline focus-within:border-transparent outline-2 outline-blue-500'>
          <MagnifyingGlass size={16} className='text-black/25'/>
          <input 
            className='md:w-96 outline-none'
            type="text" 
            placeholder='Pesquise'
          />
        </div>
      </header>

      <h1 className='text-center my-5 text-2xl font-semibold'>
        Equipamentos
      </h1>

      <div className='px-6 mb-5 flex gap-5 flex-wrap'>
        {equipamentos.map(equip => (
          <CardEquipamento 
            key={equip.tag} 
            image={equip.image} 
            tag={equip.tag}
          />
        ))}
      </div>
    </div>
  )
}
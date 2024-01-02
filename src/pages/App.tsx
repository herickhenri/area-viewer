import { MagnifyingGlass } from '@phosphor-icons/react'
import logoSuzano from '../assets/logo_suzano.png'

import { CardEquipamento } from '../components/CardEquipamento'
import { equipamentos } from '../data/DataEquip'
import { useState } from 'react'

export function App() {
  const [search, setSearch] = useState("")

  const filteredEquip = search.length > 0 
    ? equipamentos.filter(({name, tag}) => {
        const tagString = tag.unit+tag.area+tag.equipCode+tag.seqNumber
        const nameUpper = name.toUpperCase()
        const searchUpper = search.toUpperCase()

        return tagString.includes(searchUpper) || nameUpper.includes(searchUpper)
      })
    : []
  
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
            value={search}
            onChange={(e) => setSearch(e.target.value)}

          />
        </div>
      </header>

      <h1 className='text-center my-5 text-2xl font-semibold'>
        Equipamentos
      </h1>

      {search.length > 0 ? (
        <div className='px-6 mb-5 flex gap-5 flex-wrap'>
          {filteredEquip.map(equip => (
            <CardEquipamento 
            key={equip.tag.area+equip.tag.equipCode+equip.tag.seqNumber} 
            image={equip.image} 
            tag={equip.tag}
            />
          ))}    
        </div>
      ) : (
        <div className='px-6 mb-5 flex gap-5 flex-wrap'>
          {equipamentos.map(equip => (
            <CardEquipamento 
            key={equip.tag.area+equip.tag.equipCode+equip.tag.seqNumber} 
            image={equip.image} 
            tag={equip.tag}
            />
          ))}
        </div>
      )}
    </div>
  )
}
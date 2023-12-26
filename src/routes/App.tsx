import logoSuzano from '../assets/logo_suzano.png'
import { CardEquipamento } from '../components/CardEquipamento'

import bombaLama from '../assets/equipamentos/i1501bb101.jpeg'
import bombaCondensado from '../assets/equipamentos/i1502bb220.jpeg'
import bombaDregs from '../assets/equipamentos/i1502bb218.jpeg'
import misturadorPoco from '../assets/equipamentos/i1502mx215.jpeg'

export function App() {
  return (
    <div className='flex flex-col  pb-5'>
      <header className='py-4 px-4 shadow-lg flex flex-col md:flex-row items-center gap-8'>
        <a href="/">
          <img src={logoSuzano} alt="Logo da suzano" className='h-8'/>
        </a>

        <input 
          className='text-white outline-none max-w-[32rem] px-4 py-2 bg-slate-900 w-full rounded-full'
          type="text" 
          placeholder='Pesquise por um equipamento'
        />
      </header>

      <div className='text-gray-300 w-full px-16 my-8 flex justify-center gap-4 flex-wrap'>
        <h1 className='w-full text-center font-semibold text-2xl'>Lista de equipamentos</h1>
        <CardEquipamento tag={'I1501BB101'} image={bombaLama}/>
        <CardEquipamento tag={'I1502BB220'} image={bombaCondensado}/>
        <CardEquipamento tag={'I1502BB218'} image={bombaDregs}/>
        <CardEquipamento tag={'I1502MX215'} image={misturadorPoco}/>
      </div>

      <footer className='flex justify-center'>
        <a 
        className='text-lg font-semibold text-gray-300 py-3 px-4 rounded-lg bg-violet-600 hover:bg-violet-500 transition-colors'
        href="/viewer"
        >
          Acesse a área
        </a>
      </footer>
    </div>
  )
}
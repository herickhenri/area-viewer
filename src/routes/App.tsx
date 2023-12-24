import logoSuzano from '../assets/logo_suzano.png'
import { CardEquipamento } from '../components/CardEquipamento'

export function App() {
  return (
    <div className='flex flex-col  pb-5'>
      <header className='py-4 px-4 shadow-lg flex flex-col md:flex-row items-center gap-8'>
        <img src={logoSuzano} alt="Logo da suzano" className='h-8'/>

        <input 
          className='text-white outline-none max-w-[32rem] px-4 py-2 bg-slate-900 w-full rounded-full'
          type="text" 
          placeholder='Pesquise por um equipamento'
        />
      </header>

      <div className='text-gray-300 w-full px-16 my-8 flex justify-center gap-4 flex-wrap'>
        <h1 className='w-full text-center font-semibold text-2xl'>Lista de equipamentos</h1>
        <CardEquipamento />
        <CardEquipamento />
        <CardEquipamento />
        <CardEquipamento />
        <CardEquipamento />
        <CardEquipamento />
        <CardEquipamento />
        <CardEquipamento />
      </div>
    </div>
  )
}
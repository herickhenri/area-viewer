import bombaLama from '../assets/i1501bb104.jpeg'

export function CardEquipamento() {
  return (
    <div className='w-64 p-2 bg-slate-900 rounded-lg shadow-xl'>
    <img 
      className='h-64 w-full object-cover'
      src={bombaLama} 
      alt="bomba de lama" 
    />

    <span className='text-xs'>tag: I-1502-BB-104</span>
    <h2 className='my-2 text-xl font-semibold'>Bomba de Lama para LMCD 1</h2>
    <button className='py-2 text-lg font-semibold rounded-lg text-center w-full bg-green-800 hover:bg-green-700 transition-colors'>Mais Informações</button>
  </div>
  )
}
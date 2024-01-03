import { Link } from 'react-router-dom'
import logoSuzano from '../assets/logo_suzano.png'

export function HeaderAdmin() {
  return (
    <header className='py-4 px-4 shadow-lg flex w-full justify-between items-center gap-8'>
    <Link to="/admin" className='flex items-end font-semibold text-blue-700'>
      <img src={logoSuzano} alt="Logo da suzano" className='h-8'/>
      <h2>Admin</h2>
    </Link>
  </header>
  )
}
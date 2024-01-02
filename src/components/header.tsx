import { Link } from 'react-router-dom'
import logoSuzano from '../assets/logo_suzano.png'

export function Header() {
  return (
    <header className='py-4 px-4 shadow-lg flex w-full justify-between items-center gap-8'>
    <Link to="/">
      <img src={logoSuzano} alt="Logo da suzano" className='h-8'/>
    </Link>
  </header>
  )
}
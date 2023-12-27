import logoSuzano from '../assets/logo_suzano.png'

export function Header() {
  return (
    <header className='py-4 px-4 shadow-lg flex w-full flex-col md:flex-row items-center gap-8'>
    <a href="/">
      <img src={logoSuzano} alt="Logo da suzano" className='h-8'/>
    </a>

  </header>
  )
}
import logoSuzano from '../assets/logo_suzano.png'

export function HeaderAdmin() {
  return (
    <header className='py-4 px-4 shadow-lg flex w-full flex-col md:flex-row items-center gap-8'>
    <a href="/admin" className='flex items-end font-semibold text-blue-700'>
      <img src={logoSuzano} alt="Logo da suzano" className='h-8'/>
      <h2>Admin</h2>
    </a>

  </header>
  )
}
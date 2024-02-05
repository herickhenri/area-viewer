import { Link, Outlet } from 'react-router-dom'

import logoSuzano from '@/assets/logo_suzano.png'

export function AppLayout() {
  // TODO: Ajustar a barra de pesquisa
  return (
    <div>
      <header className="flex w-full items-center gap-8 px-4 py-4 shadow-lg">
        <Link to="/">
          <img src={logoSuzano} alt="Logo da suzano" className="h-8" />
        </Link>

        <nav className="ml-10 flex divide-x">
          <Link to="/" className="px-2 py-2 font-semibold hover:bg-gray-100">
            Equipamentos
          </Link>
          <Link
            className="px-2 py-2 font-semibold hover:bg-gray-100"
            to="panoramas"
          >
            Panoramas
          </Link>
        </nav>
      </header>

      <Outlet />
    </div>
  )
}

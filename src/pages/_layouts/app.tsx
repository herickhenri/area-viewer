import { Link, Outlet } from 'react-router-dom'

import logoSuzano from '@/assets/logo_suzano.png'

export function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex w-full items-center justify-between gap-2 px-4 py-4 shadow-lg md:justify-normal">
        <Link to="/">
          <img src={logoSuzano} alt="Logo da suzano" className="h-8" />
        </Link>

        <nav className="flex divide-x md:ml-10">
          <Link to="/" className="px-2 py-2 font-semibold hover:bg-gray-100">
            Equipamentos
          </Link>
          <Link
            className="px-2 py-2 font-semibold hover:bg-gray-100"
            to="panoramas"
          >
            Panoramas
          </Link>
          <Link
            className="px-2 py-2 font-semibold hover:bg-gray-100"
            to="notes"
          >
            Notas
          </Link>
        </nav>
      </header>

      <Outlet />
    </div>
  )
}

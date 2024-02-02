import { Link, Outlet } from 'react-router-dom'

import logoSuzano from '@/assets/logo_suzano.png'

export function AppLayout() {
  // TODO: Ajustar a barra de pesquisa
  return (
    <div>
      <header className="flex w-full items-center justify-between gap-8 px-4 py-4 shadow-lg">
        <Link to="/">
          <img src={logoSuzano} alt="Logo da suzano" className="h-8" />
        </Link>
      </header>

      <Outlet />
    </div>
  )
}

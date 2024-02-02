import { Link, Outlet } from 'react-router-dom'

import logoSuzano from '@/assets/logo_suzano.png'

export function AdminLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex w-full items-center justify-between gap-8 px-4 py-4 shadow-lg">
        <Link
          to="/admin"
          className="flex items-end font-semibold text-blue-700"
        >
          <img src={logoSuzano} alt="Logo da suzano" className="h-8" />
          <h2>Admin</h2>
        </Link>
      </header>

      <Outlet />
    </div>
  )
}

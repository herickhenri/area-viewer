import { Link, Outlet } from 'react-router-dom'

import areaViewerLogo from '@/assets/area-viewer-logo.png'
import { Menu } from './menu'
import { Navigate } from './navigate'

export function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      <header className="flex w-full items-center justify-between gap-2 bg-white px-4 py-2 shadow-lg md:justify-normal">
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-semibold text-gray-600"
        >
          <img src={areaViewerLogo} alt="Logo da suzano" className="h-10" />
          <span>
            Area<span className="text-blue-600">Viewer</span>
          </span>
        </Link>

        <Navigate />
        <Menu />
      </header>

      <Outlet />
    </div>
  )
}

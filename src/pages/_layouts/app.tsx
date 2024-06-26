import { Link, Outlet } from 'react-router-dom'

import areaViewerLogo from '@/assets/area-viewer-logo.png'

export function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex w-full items-center justify-between gap-2 px-4 py-2 shadow-lg md:justify-normal">
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-semibold text-[#4D4D4D]"
        >
          <img src={areaViewerLogo} alt="Logo da suzano" className="h-10" />
          <span>
            Area<span className="text-[#0082FC]">Viewer</span>
          </span>
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

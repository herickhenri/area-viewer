import { Link, Outlet } from 'react-router-dom'

import areaViewerLogo from '@/assets/area-viewer-logo.png'
import { List, X } from '@phosphor-icons/react'
import { useState } from 'react'

export function AppLayout() {
  const [showMenu, setShowMenu] = useState(false)

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

        <nav className="ml-10  hidden divide-x md:flex">
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

        <div className="block md:hidden">
          <List
            size={24}
            className="cursor-pointer transition-all hover:text-blue-600"
            onClick={() => setShowMenu(true)}
          />
          <div
            className={`${showMenu ? '' : '-translate-x-full'} fixed inset-0 z-[100] flex flex-col items-center justify-center gap-3 bg-white px-8 text-center text-2xl font-semibold`}
          >
            <X
              size={24}
              className="absolute right-4 top-4 z-10 cursor-pointer transition-colors hover:text-red-800"
              onClick={() => setShowMenu(false)}
            />
            <Link
              className="w-full py-2 transition-colors hover:text-blue-600"
              to="/"
              onClick={() => setShowMenu(false)}
            >
              Equipamentos
            </Link>
            <Link
              className="w-full py-2 transition-colors hover:text-blue-600"
              to="panoramas"
              onClick={() => setShowMenu(false)}
            >
              Panoramas
            </Link>
            <Link
              className="w-full py-2 transition-colors hover:text-blue-600"
              to="notes"
              onClick={() => setShowMenu(false)}
            >
              Notas
            </Link>
          </div>
        </div>
      </header>
      <Outlet />
    </div>
  )
}

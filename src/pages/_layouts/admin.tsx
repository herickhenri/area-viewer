import { Link, Outlet } from 'react-router-dom'

import areaViewerLogo from '@/assets/area-viewer-logo.png'

export function AdminLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex w-full items-center justify-between gap-8 px-4 py-2 shadow-lg">
        <Link
          to="/admin"
          className="flex items-center gap-2 text-xl font-semibold text-[#4D4D4D]"
        >
          <img src={areaViewerLogo} alt="Logo da suzano" className="h-10" />
          <span>
            Area<span className="text-[#0082FC]">Viewer</span>
            <span className="text-sm">Admin</span>
          </span>
        </Link>
      </header>

      <Outlet />
    </div>
  )
}

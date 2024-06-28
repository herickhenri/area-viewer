import { List, X } from '@phosphor-icons/react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export function Menu() {
  const [showMenu, setShowMenu] = useState(false)

  return (
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
        <Link
          className="w-full py-2 transition-colors hover:text-blue-600"
          to="admin"
          onClick={() => setShowMenu(false)}
        >
          Admin
        </Link>
      </div>
    </div>
  )
}

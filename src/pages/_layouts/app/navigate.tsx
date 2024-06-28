import { Link } from 'react-router-dom'

export function Navigate() {
  return (
    <nav className="ml-10  hidden divide-x md:flex">
      <Link
        to="/"
        className="px-2 py-2 font-semibold transition-colors hover:bg-gray-100"
      >
        Equipamentos
      </Link>
      <Link
        className="px-2 py-2 font-semibold transition-colors hover:bg-gray-100"
        to="panoramas"
      >
        Panoramas
      </Link>
      <Link
        className="px-2 py-2 font-semibold transition-colors hover:bg-gray-100"
        to="notes"
      >
        Notas
      </Link>
      <Link
        className="px-2 py-2 font-semibold transition-colors hover:bg-gray-100"
        to="admin"
      >
        Admin
      </Link>
    </nav>
  )
}

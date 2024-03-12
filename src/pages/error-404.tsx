import { Button } from '@/components/button'
import { SmileyXEyes } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'

export function PageNotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4 bg-gray-200 px-8 text-center text-blue-950">
      <div className="flex items-center gap-2">
        <h1 className="text-4xl font-bold md:text-5xl">Error 404</h1>
        <SmileyXEyes weight="fill" className="h-16 w-16" />
      </div>
      <h2 className="text-3xl md:text-4xl">Página não econtrada</h2>
      <p className="md:text-lg">
        A página que você procura não existe, ou foi movida. Por favor, volte
        para a página principal.
      </p>
      <Link to={'/'}>
        <Button>Página principal</Button>
      </Link>
    </div>
  )
}

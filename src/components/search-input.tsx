import { MagnifyingGlass } from '@phosphor-icons/react'
import { tv } from 'tailwind-variants'

const searchInput = tv({
  base: 'mx-6 mt-6 flex items-center gap-2 rounded-full border border-solid border-black/25 px-4 py-2 outline-2 outline-blue-500 focus-within:border-transparent focus-within:outline md:mx-auto md:w-[32rem]',
})

interface searchInputProps {
  search: string
  changeSearch: (search: string) => void
  className?: string
}

export function SearchInput({
  search,
  changeSearch,
  className,
}: searchInputProps) {
  return (
    <div className={searchInput(className)}>
      <MagnifyingGlass size={16} className="text-black/25" />
      <input
        className="flex-1 bg-transparent outline-none md:w-96"
        type="text"
        placeholder="Pesquise"
        value={search}
        onChange={(e) => changeSearch(e.target.value)}
      />
    </div>
  )
}

import { ElementType } from 'react'
import { Link } from 'react-router-dom'

interface QuickAccessLink {
  title: string
  link: string
  icon: ElementType
  color: string
}

export function QuickAccessLink({
  title,
  link,
  icon: Icon,
  color,
}: QuickAccessLink) {
  return (
    <Link
      to={link}
      className="flex min-w-64 flex-1 cursor-pointer items-center gap-3 border bg-white p-3 transition-colors hover:bg-gray-200"
    >
      <Icon
        className="h-12 w-12 rounded-full p-2 text-white"
        style={{ backgroundColor: color }}
      />
      {title}
    </Link>
  )
}

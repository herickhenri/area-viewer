import { ElementType } from 'react'
import { Link } from 'react-router-dom'

interface ButtonAdmProps {
  content: string
  icon: ElementType
  link: string
}

export function ButtonAdm({ content, icon: Icon, link }: ButtonAdmProps) {
  return (
    <Link
      to={link}
      className="flex w-full items-center justify-center gap-2 rounded border border-solid border-blue-600 p-2 text-xl font-medium text-blue-600 transition-colors hover:bg-blue-600 hover:text-white"
    >
      <Icon size={32} />
      {content}
    </Link>
  )
}
